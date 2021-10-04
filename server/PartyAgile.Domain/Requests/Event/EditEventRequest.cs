using PartyAgile.Domain.Entities;
using System;

namespace PartyAgile.Domain.Requests.Event
{
    public class EditEventRequest
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Price Budget { get; set; }
        public DateTimeOffset EventDate { get; set; }
        public int Guests { get; set; }
        public Guid CreatorId { get; set; }
        public string CreatorName { get; set; }
    }
}
