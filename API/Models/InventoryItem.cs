namespace API.Models
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public int TenantId { get; set; }

        public string Name { get; set; }
        public int Quantity { get; set; }
        public int MinStock { get; set; }
        public double UnitPrice { get; set; }
        public string ImageUrl { get; set; }

        public Tenant Tenant { get; set; }
    }
}
