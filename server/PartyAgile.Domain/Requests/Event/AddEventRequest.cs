using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Requests.Event
{
    public class AddEventRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Price Budget { get; set; }
        public DateTimeOffset EventDate { get; set; }
        public int Guests { get; set; }
    }
}
