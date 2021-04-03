using System;

namespace PartyAgile.Domain.Entities
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
    }
}