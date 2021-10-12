using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Responses
{
    public class VendorEventSimpleResponse
    {
        public Guid VendorId { get; set; }
        public Guid EventId { get; set; }
        public PriceResponse Budget { get; set; }
        public PriceResponse DepositPaid { get; set; }
    }
}
