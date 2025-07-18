namespace API.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int TenantId { get; set; }

        public string Type { get; set; }  // "Income", "Expense"
        public string Category { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;

        public Tenant Tenant { get; set; }
    }
}
