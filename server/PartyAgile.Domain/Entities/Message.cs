using System;

namespace PartyAgile.Domain.Entities
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTimeOffset Created { get; set; }

        public string SenderName { get; set; }
        public Guid VendorId { get; set; }
        public Guid EventId { get; set; }
        
        public VendorEvent Event { get; set; }
    }
}
