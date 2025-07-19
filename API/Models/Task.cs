using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public enum TaskStatus
    {
        Pending,
        InProgress,
        Completed,
        Cancelled
    }

    public class Task
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TenantId { get; set; } // Foreign Key

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [MaxLength(2000)] // İçeriğin uzunluğuna göre ayarla
        public string? Content { get; set; }

        public int? AssignedToUserId { get; set; } // Nullable Foreign Key

        [Required]
        public TaskStatus Status { get; set; }

        public DateTime? DueDate { get; set; } // Nullable date

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public Tenant Tenant { get; set; } = null!;
        public User? AssignedToUser { get; set; } // Nullable navigation property
    }
}