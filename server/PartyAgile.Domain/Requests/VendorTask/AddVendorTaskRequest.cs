using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Requests.EventTask
{
    public class AddVendorTaskRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid VendorId { get; set; }
    }
}
