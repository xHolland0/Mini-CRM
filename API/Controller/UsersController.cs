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
                .Include(u => u.Position) 
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
                .Include(u => u.Position)
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

            // Auth0 Action'ınızdaki özel claim URL'lerini kullanarak e-posta ve isim almaya çalışın
            // Bu değerler sadece loglama ve doğrulama amaçlıdır, veritabanına kaydedilmez.
            var emailFromAuth0 = User.FindFirst("https://localhost:3000/email")?.Value;
            var nameFromAuth0 = User.FindFirst("https://localhost:3000/name")?.Value;

            if (user == null)
            {
                // Kullanıcı yoksa, yeni bir kayıt oluştur
                Console.WriteLine($"--- SyncUser Çağrısı ---");
                Console.WriteLine($"Auth0Id: {auth0Id}");
                Console.WriteLine($"Auth0'dan Alınan Email (Özel Claim): {emailFromAuth0 ?? "Yok"}");
                Console.WriteLine($"Auth0'dan Alınan İsim (Özel Claim): {nameFromAuth0 ?? "Yok"}");
                Console.WriteLine($"Tüm Claimler:");
                foreach (var claim in User.Claims)
                {
                    Console.WriteLine($"- Type: {claim.Type}, Value: {claim.Value}");
                }
                Console.WriteLine($"-----------------------");

                var defaultTenantId = 1; // Varsayılan kiracı ID'si, kendi veritabanınızda mevcut olmalı!
                var defaultRole = UserRole.Employee; // Varsayılan rol
                int? defaultPositionId = null; // Başlangıçta pozisyon atanmamış olabilir

                user = new User
                {
                    Auth0Id = auth0Id,
                    TenantId = defaultTenantId, 
                    Role = defaultRole,
                    Phone = null, // Yeni kullanıcı için başlangıçta telefon numarası boş
                    PositionId = defaultPositionId 
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Yeni oluşturulan kullanıcıyı döndürürken ilişkili verileri de yükle
                // CreatedAtAction, GetUser'ı çağıracağı için bu yüklemeler orada yapılacaktır.
                // Burada sadece temel bilgileri döndürelim.
                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new 
                {
                    user.Id,
                    user.Auth0Id,
                    user.TenantId,
                    user.Role,
                    user.Phone,
                    user.PositionId,
                    // Tenant ve Position isimlerini de dahil edebiliriz, ancak null kontrolü ile
                    TenantName = user.Tenant?.Name, 
                    PositionName = user.Position?.Name 
                });
            }

            // Kullanıcı zaten varsa, mevcut kullanıcıyı döndür (basitleştirilmiş versiyon)
            // Sadece temel özellikleri ve ilişkili nesnelerin isimlerini döndürüyoruz.
            // Bu, döngüsel referanslardan kaynaklanan serileştirme hatalarını önlemelidir.
            return Ok(new 
            {
                user.Id,
                user.Auth0Id,
                user.TenantId,
                user.Role,
                user.Phone,
                user.PositionId,
                // İlişkili nesneleri yükleyip isimlerini ekliyoruz
                TenantName = user.Tenant?.Name, // Tenant'ın adını güvenli bir şekilde al
                PositionName = user.Position?.Name // Position'ın adını güvenli bir şekilde al
            });
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
