namespace API.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int TenantId { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;

        public Tenant Tenant { get; set; }
        public User User { get; set; }
    }
}
