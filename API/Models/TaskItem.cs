namespace API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public int TenantId { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public string AssignedToUserId { get; set; }
        public string Status { get; set; }  // "Pending", "Done"
        public DateTime? DueDate { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public Tenant Tenant { get; set; }
        public User AssignedToUser { get; set; }
    }
}
