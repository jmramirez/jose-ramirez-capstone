using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Responses
{
    public class VendorWithTaskResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<VendorTaskResponse> Tasks { get; set; }
    }
}
