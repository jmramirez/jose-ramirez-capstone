using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Responses
{
    public class EventWithUserInfo
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTimeOffset EventDate { get; set; }
        public int Guests { get; set; }
        public string PlanerName { get; set; }
        public string PlanerPhone { get; set; } 
    }
}
