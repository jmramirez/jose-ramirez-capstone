using System;

namespace PartyAgile.Domain.Entities
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public Guid TaskId { get; set; }
        public VendorTask Task { get; set; }

    }
}