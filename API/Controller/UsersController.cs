    using Microsoft.AspNetCore.Mvc;
    using API.Data;
    using API.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization; 

    namespace API.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        [Authorize] 
        public class UsersController : ControllerBase
        {
            private readonly AppDbContext _context; 
            
            public UsersController(AppDbContext context)
            {
                _context = context;
            }

            // GET: api/users
            // Tüm kullanıcıları veritabanından getirir.
            [HttpGet]
            public async Task<ActionResult<IEnumerable<User>>> GetUsers()
            {
                // Tenant, Tasks ve Notes dahil ilişkili verileri asenkron olarak getir
                var users = await _context.Users
                    .Include(u => u.Tenant) 
                    .Include(u => u.Tasks)  
                    .Include(u => u.Notes)  
                    .ToListAsync(); 

                return Ok(users);
            }

            // Diğer metotlar (GetUser, CreateUser, UpdateUser, DeleteUser) aynı kalacak
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

            [HttpPost]
            public async Task<ActionResult<User>> CreateUser(User user)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }

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
    