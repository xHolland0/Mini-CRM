using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    // Kullanıcı rolleri 
    public enum UserRole
    {
        Admin,    
        Manager,  
        Employee, 
        
    }

    public class User
    {
        [Key] 
        public int Id { get; set; }

        [Required] 
        public int TenantId { get; set; } 


        [Required] 
        [MaxLength(256)] 
        public required string Auth0Id { get; set; } 

        [Required] 
        [MaxLength(255)] 
        public required string Name { get; set; }

        [Required] 
        [EmailAddress] 
        [MaxLength(255)] 
        public required string Email { get; set; }

        [Required] 
        public UserRole Role { get; set; } 

        [MaxLength(20)] 
        public string? Phone { get; set; } 

        [MaxLength(100)] 
        public string? Position { get; set; } 

        // Navigation properties
        public Tenant Tenant { get; set; } = null!; // Zorunlu ilişki: Kullanıcının ait olduğu kiracı
        public ICollection<Task>? Tasks { get; set; } 
        public ICollection<Note>? Notes { get; set; } 
    }
}
