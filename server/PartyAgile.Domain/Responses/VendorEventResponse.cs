using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Responses
{
    public class VendorEventResponse
    {
        public Guid Id { get; set; }
        public string CreatorName { get; set; }
        public string CreatorPhone { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTimeOffset EventDate { get; set; }
        public int Guests { get; set; }
        public PriceResponse Budget { get; set; }
        public PriceResponse DepositPaid { get; set; }

    }
}
