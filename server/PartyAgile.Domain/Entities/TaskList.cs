using System;
using System.Collections.Generic;

namespace PartyAgile.Domain.Entities
{
    public class TasksList
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public ICollection<Task> Tasks { get; set; } 
    }
}