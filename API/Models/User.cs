using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public enum UserRole // Role enum'u
    {
        Admin,
        Manager,
        Employee,
        // İhtiyacına göre diğer roller eklenebilir
    }

    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TenantId { get; set; } // Foreign Key

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public UserRole Role { get; set; } // Enum

        [MaxLength(20)]
        public string? Phone { get; set; }

        [MaxLength(100)]
        public string? Position { get; set; }

        // Navigation property
        public Tenant Tenant { get; set; } = null!; // Zorunlu ilişki
        public ICollection<Task>? Tasks { get; set; } // Assigned tasks
        public ICollection<Note>? Notes { get; set; } // Created notes
    }
}