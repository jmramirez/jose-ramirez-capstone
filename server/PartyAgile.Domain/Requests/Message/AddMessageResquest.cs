using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Requests.Message
{
    public class AddMessageResquest
    {
        public string Content { get; set; }
        public DateTimeOffset Created { get; set; }
        public Guid VendorId { get; set; }
        public Guid EventId { get; set; }
    }
}
