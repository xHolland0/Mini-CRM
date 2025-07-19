using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class InventoryItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TenantId { get; set; } // Foreign Key

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        public int Quantity { get; set; }

        public int? MinStock { get; set; } // Nullable

        [Required]
        [Column(TypeName = "decimal(18, 2)")] // Hassasiyet ve ölçek belirleme
        public decimal UnitPrice { get; set; } // Float yerine Decimal

        [MaxLength(2000)] // URL'ler genelde daha uzun olabilir
        public string? ImageUrl { get; set; }

        // Navigation property
        public Tenant Tenant { get; set; } = null!;
    }
}