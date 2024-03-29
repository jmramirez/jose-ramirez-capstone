﻿using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Repositories
{
    public interface IEventRepository : IRepository
    {
        Task<IEnumerable<Event>> GetAsync();
        Task<IEnumerable<Event>> GetEventsByUserIdAsync(Guid id, string timing);
        Task<Event> GetEventWithVendorsAsync(Guid id);
        Task<Event> GetAsync(Guid id, Guid userId);
        Event Add(Event item);
        Event Update(Event item);
        Task<IEnumerable<Vendor>> GetVendorsByEventIdAsync(Guid id, Guid userId);
        Task<IEnumerable<Event>> GetEventsByVendorIdAsync(Guid id);
    }
}
