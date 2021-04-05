﻿using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Repositories
{
    public interface IEventRepository : IRepository
    {
        Task<IEnumerable<Event>> GetAsync();
        Task<Event> GetAsync(Guid id);
        Event Add(Event item);
        Event Update(Event item);
    }
}