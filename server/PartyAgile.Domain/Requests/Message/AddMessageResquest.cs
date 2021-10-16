using System;

namespace PartyAgile.Domain.Requests.Message
{
    public class AddMessageResquest
    {
        public string Content { get; set; }
        public string Sender { get; set; }
        public DateTimeOffset Created { get; set; }
        public Guid VendorId { get; set; }
        public Guid EventId { get; set; }
    }
}
