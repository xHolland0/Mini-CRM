using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims; // Claim türlerini kullanmak için
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Auth0: Bu controller'daki TÜM endpoint'lere erişim için geçerli bir JWT token'ı gereklidir.
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context; 
        
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Tenant) 
                .Include(u => u.Tasks)  
                .Include(u => u.Notes)  
                .ToListAsync(); 

            return Ok(users);
        }

        // GET: api/users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Tenant)
                .Include(u => u.Tasks)
                .Include(u => u.Notes)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // POST: api/users/sync
        // Auth0 kullanıcısını veritabanına senkronize eder (JIT Provisioning).
        // Kullanıcı yoksa oluşturur, varsa mevcut kullanıcıyı döndürür.
        [HttpPost("sync")]
        public async Task<ActionResult<User>> SyncUser()
        {
            // Auth0'dan gelen 'sub' claim'ini alıyoruz. Bu, Auth0 kullanıcısının benzersiz kimliğidir.
            var auth0Id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(auth0Id))
            {
                return Unauthorized("Auth0 kullanıcı kimliği bulunamadı.");
            }

            // Veritabanında bu Auth0Id'ye sahip bir kullanıcı var mı kontrol et
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Auth0Id == auth0Id);

            if (user == null)
            {
                // Kullanıcı yoksa, yeni bir kayıt oluştur
                // Auth0'dan gelen diğer claim'leri almayı dene
                // Genellikle Auth0, 'name' ve 'email' claim'lerini doğrudan gönderir.
                var email = User.FindFirst("email")?.Value ?? User.FindFirst(ClaimTypes.Email)?.Value;
                var name = User.FindFirst("name")?.Value ?? User.FindFirst(ClaimTypes.Name)?.Value;
                
                // Eğer isim hala boşsa, nickname'i dene (Auth0'dan gelebilir)
                if (string.IsNullOrEmpty(name))
                {
                    name = User.FindFirst("nickname")?.Value;
                }

                // Hangi claim'lerin geldiğini görmek için konsola yazdır (GEÇİCİ)
                Console.WriteLine($"--- SyncUser Çağrısı ---");
                Console.WriteLine($"Auth0Id: {auth0Id}");
                Console.WriteLine($"Alınan Email: {email}");
                Console.WriteLine($"Alınan İsim: {name}");
                Console.WriteLine($"Tüm Claimler:");
                foreach (var claim in User.Claims)
                {
                    Console.WriteLine($"- Type: {claim.Type}, Value: {claim.Value}");
                }
                Console.WriteLine($"-----------------------");


                // TODO: TenantId'yi dinamik olarak belirlemeniz gerekecek.
                // Şimdilik varsayılan bir TenantId kullanıyoruz (örneğin 1).
                // Gerçek bir uygulamada, bu TenantId'yi ya bir config'den alırsınız
                // ya da Auth0'dan gelen custom claim'lerden okursunuz.
                var defaultTenantId = 1; // Varsayılan kiracı ID'si, kendi veritabanınızda mevcut olmalı!

                // TODO: Rolü dinamik olarak belirlemeniz gerekecek.
                // Şimdilik varsayılan bir rol atıyoruz (örneğin Employee).
                // Gerçek bir uygulamada, bu rolü Auth0'dan gelen custom claim'lerden okuyabilirsiniz.
                var defaultRole = UserRole.Employee; // Varsayılan rol

                user = new User
                {
                    Auth0Id = auth0Id,
                    Email = email ?? "bilinmeyen@example.com", // E-posta yoksa varsayılan
                    Name = name ?? "Bilinmeyen Kullanıcı", // İsim yoksa varsayılan
                    TenantId = defaultTenantId, 
                    Role = defaultRole // Yeni kullanıcıya varsayılan rol atandı
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Yeni oluşturulan kullanıcıyı döndür
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }

            // Kullanıcı zaten varsa, mevcut kullanıcıyı döndür
            return Ok(user);
        }

        // PUT: api/users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest();

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id) 
        {  
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(u => u.Id == id);
        }
    }
}
