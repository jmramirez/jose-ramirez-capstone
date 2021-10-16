using System;
using System.Collections.Generic;

namespace PartyAgile.Domain.Entities
{
    public class Vendor
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string Address { get; set; }
        public AppUser User { get; set; }
        public Guid UserId { get; set; }
        public ICollection<VendorEvent> Events { get; set; }

        public ICollection<VendorTask> Tasks { get; set; }
    }
}
