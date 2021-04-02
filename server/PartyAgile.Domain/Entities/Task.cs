using System;

namespace PartyAgile.Domain.Entities
{
    public class Task
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}