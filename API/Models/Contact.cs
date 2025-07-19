using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using API.Models;

namespace API.Models
{
    public enum ContactType // İletişim türleri için enum
    {
        Customer,
        Supplier,
        Partner,
        Other
    }

    public class Contact
    {
        [Key]
        public int Id { get; set; }

        // Kiracıya zorunlu bağlı olması bekleniyorsa Required olarak kalsın,
        // aksi halde int? yapabilirsin. Çok kiracılı uygulamada genellikle zorunludur.
        public int? TenantId { get; set; } // Foreign Key

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        public ContactType Type { get; set; } // Enum

        [MaxLength(20)]
        public string? Phone { get; set; }

        [EmailAddress]
        [MaxLength(255)]
        public string? Email { get; set; } // Nullable

        // Navigation property
        public Tenant Tenant { get; set; } = null!;
    }
}