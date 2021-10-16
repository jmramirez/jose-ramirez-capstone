using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Entities
{
    public class VendorEvent
    {
        public Guid EventId { get; set; }
        public Event Event { get; set; }
        public Guid VendorId { get; set; }
        public Vendor Vendor { get; set; }

        public Price Budget { get; set; }
        public Price DepositPaid { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
