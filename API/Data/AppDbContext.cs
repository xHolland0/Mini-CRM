using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Models.Task> Tasks { get; set; } // Task yerine TaskItem kullanıyoruz
        public DbSet<Note> Notes { get; set; }
        public DbSet<Position> Positions { get; set; } // <-- Yeni Position DbSet'i eklendi

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Tenant ve User arasındaki ilişki
            modelBuilder.Entity<User>()
                .HasOne(u => u.Tenant)
                .WithMany(t => t.Users)
                .HasForeignKey(u => u.TenantId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict); // Kiracı silindiğinde kullanıcıları silme

            // User ve TaskItem arasındaki ilişki
            modelBuilder.Entity<Models.Task>()
                .HasOne(t => t.AssignedToUser) // Görevin atandığı kullanıcı
                .WithMany(u => u.Tasks)
                .HasForeignKey(t => t.AssignedToUserId)
                .IsRequired(false) // Görev her zaman bir kullanıcıya atanmayabilir
                .OnDelete(DeleteBehavior.SetNull); // Kullanıcı silinirse görevin AssignedToUserId'sini NULL yap

            // User ve Note arasındaki ilişki
            modelBuilder.Entity<Note>()
                .HasOne(n => n.User) // Notu oluşturan kullanıcı
                .WithMany(u => u.Notes)
                .HasForeignKey(n => n.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade); // Kullanıcı silinirse notları da sil

            // Position ve Tenant arasındaki ilişki
            modelBuilder.Entity<Position>()
                .HasOne(p => p.Tenant)
                .WithMany(t => t.Positions) // Tenant'ın birden fazla pozisyonu olabilir
                .HasForeignKey(p => p.TenantId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict); // Kiracı silindiğinde pozisyonları silme

            // User ve Position arasındaki ilişki
            modelBuilder.Entity<User>()
                .HasOne(u => u.Position) // Kullanıcının bir pozisyonu olabilir
                .WithMany(p => p.Users) // Bir pozisyonda birden fazla kullanıcı olabilir
                .HasForeignKey(u => u.PositionId)
                .IsRequired(false) // PositionId nullable olduğu için ilişki de isteğe bağlı
                .OnDelete(DeleteBehavior.SetNull); // Pozisyon silinirse kullanıcının PositionId'sini NULL yap
        }
    }
}
