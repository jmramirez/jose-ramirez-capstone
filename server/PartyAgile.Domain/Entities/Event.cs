using System;
using System.Collections.Generic;

namespace PartyAgile.Domain.Entities
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Price Budget { get; set; }
        public DateTimeOffset EventDate { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public ICollection<TasksList> TasksLists { get; set; }
    }
}