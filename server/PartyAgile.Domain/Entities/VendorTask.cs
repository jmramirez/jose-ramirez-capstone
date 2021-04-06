using System;
using System.Collections.Generic;

namespace PartyAgile.Domain.Entities
{
    public class VendorTask
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public string Status { get; set; }
        public Guid VendorId { get; set; }
        public Vendor Vendor { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}