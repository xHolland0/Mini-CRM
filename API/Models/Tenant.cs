using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; // Eğer Data Annotations kullanmak istersen

namespace API.Models
{
    public class Tenant
    {
        [Key] // Opsiyonel, EF Core Id ismini otomatik algılar
        public int Id { get; set; }

        [Required] // Eğer boş olmaması gerekiyorsa
        [MaxLength(255)] // Maksimum uzunluk belirle
        public string Name { get; set; }

        [MaxLength(1000)] // Opsiyonel
        public string? Description { get; set; } // Nullable

        [MaxLength(500)]
        public string? Adress { get; set; } // Nullable, "Address" olarak yazmak daha yaygın

        [MaxLength(20)] // Telefon numarası uzunluğu için uygun bir değer
        public string? Phone { get; set; } // Nullable

        [Required]
        [EmailAddress] // E-posta formatı kontrolü için
        [MaxLength(255)]
        public string Email { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow; // Otomatik olarak oluşturulma tarihi

        // Navigation properties
        public ICollection<User>? Users { get; set; }
        public ICollection<Task>? Tasks { get; set; }
        public ICollection<Note>? Notes { get; set; }
        public ICollection<Transaction>? Transactions { get; set; }
        public ICollection<InventoryItem>? InventoryItems { get; set; }
        public ICollection<Contact>? Contacts { get; set; }
    }
}