    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    namespace API.Models
    {
        public class Tenant
        {
            [Key]
            public int Id { get; set; }

            [Required]
            [MaxLength(255)]
            public string Name { get; set; }

            [MaxLength(1000)]
            public string? Description { get; set; }

            [MaxLength(500)]
            public string? Address { get; set; } // <-- Burası "Address" olmalı, "Adress" değil

            [MaxLength(20)]
            public string? Phone { get; set; }

            [Required]
            [EmailAddress]
            [MaxLength(255)]
            public string Email { get; set; }

            public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

            // Navigation properties
            public ICollection<User>? Users { get; set; }
            public ICollection<Task>? Tasks { get; set; }
            public ICollection<Position>? Positions { get; set; } 
            public ICollection<Note>? Notes { get; set; }
            public ICollection<Transaction>? Transactions { get; set; }
            public ICollection<InventoryItem>? InventoryItems { get; set; }
            public ICollection<Contact>? Contacts { get; set; }
        }
    }
    