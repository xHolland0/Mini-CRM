namespace API.Models
{
    public class User
    {
        public string UserId { get; set; }  // Auth0 sub ID gibi string
        public int TenantId { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }  // "Admin" / "Employee"
        public string Phone { get; set; }
        public string Position { get; set; }

        public Tenant Tenant { get; set; }
        public ICollection<TaskItem> Tasks { get; set; }
        public ICollection<Note> Notes { get; set; }
    }
}
