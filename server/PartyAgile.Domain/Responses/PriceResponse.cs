using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Responses
{
    public class PriceResponse
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; }
    }
}
