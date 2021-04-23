using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Requests.Vendor
{
    public class AssignVendorRequest
    {
        public Guid EventId { get; set; }
        public Guid VendorId { get; set; }
        public Price Budget { get; set; }
        public Price DepositPaid { get; set; }
    }
}
