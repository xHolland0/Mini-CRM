namespace API.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public int TenantId { get; set; }

        public string Name { get; set; }
        public string Type { get; set; }  // "Customer", "Supplier" vs.
        public string Phone { get; set; }
        public string Email { get; set; }

        public Tenant Tenant { get; set; }
    }
}
