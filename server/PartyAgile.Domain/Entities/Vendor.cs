using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public Price Budget { get; set; }
        public Price DepositPaid { get; set; }
        public ICollection<Event> Events { get; set; }

    }
}
