using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore; 

namespace API.Models
{
    // Kullanıcı rolleri için enum tanımı
    public enum UserRole
    {
        Admin,   
        Manager,  
        Employee, 
    }

    [Index(nameof(Auth0Id), IsUnique = true)] 
    public class User
    {
        [Key] // Primary Key olarak işaretler
        public int Id { get; set; }

        [Required] // Zorunlu alan
        public int TenantId { get; set; } // Foreign Key: Kullanıcının ait olduğu kiracı ID'si

        [Required] 
        [MaxLength(256)] 
        public string Auth0Id { get; set; } 

        // Name ve Email artık burada tutulmuyor, Auth0'dan çekilecek.
        // [Required] 
        // [MaxLength(255)] 
        // public string Name { get; set; }

        // [Required] 
        // [EmailAddress] 
        // [MaxLength(255)] 
        // public string Email { get; set; }

        [Required] 
        public UserRole Role { get; set; } 

        [MaxLength(20)] 
        public string? Phone { get; set; } 

        public int? PositionId { get; set; } // Nullable Foreign Key: Kullanıcının pozisyon ID'si

        // Navigation properties (ilişkili tablolar)
        public Tenant Tenant { get; set; } = null!; 
        public Position? Position { get; set; } 
        public ICollection<Task>? Tasks { get; set; } 
        public ICollection<Note>? Notes { get; set; } 
    }
}
