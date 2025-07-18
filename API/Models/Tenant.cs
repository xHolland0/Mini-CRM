namespace API.Models
{
    public class Tenant
    {
        public int TenantId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public ICollection<User> Users { get; set; }
        public ICollection<InventoryItem> InventoryItems { get; set; }
        public ICollection<TaskItem> Tasks { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
        public ICollection<Contact> Contacts { get; set; }
    }
}
