using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; // Column attribute için

namespace API.Models
{
    public enum TransactionType
    {
        Income,
        Expense
    }

    public enum TransactionCategory // Eğer enum kullanacaksan
    {
        Salary,
        Rent,
        Invoice,
        Other
        // ... diğer kategoriler
    }

    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TenantId { get; set; } // Foreign Key

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        // Eğer kategori bir enum ise
        public TransactionCategory Category { get; set; }

        // Eğer kategori ayrı bir tablodan gelecekse (önerilen)
        // public int CategoryId { get; set; }
        // public Category Category { get; set; } = null!;

        [Required]
        [Column(TypeName = "decimal(18, 2)")] // Hassasiyet ve ölçek belirleme
        public decimal Amount { get; set; } // Float yerine Decimal

        [MaxLength(1000)]
        public string? Description { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        // Navigation property
        public Tenant Tenant { get; set; } = null!;
    }
}