using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TenantId { get; set; } // Foreign Key

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [MaxLength(2000)]
        public string? Content { get; set; }

        [Required]
        public int UserId { get; set; } // Foreign Key

        public DateTime Date { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public Tenant Tenant { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}