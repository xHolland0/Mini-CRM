using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace API.Models
{
    public class Position
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } 

        [Required]
        public int TenantId { get; set; }

        // Navigation property
        public Tenant Tenant { get; set; } = null!; 

        public ICollection<User>? Users { get; set; } 
    }
}
