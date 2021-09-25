using PartyAgile.Domain.Entities;
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
        Task<IEnumerable<Event>> GetEventsByUserIdAsync(Guid id);
        Task<Event> GetEventWithVendorsAsync(Guid id);
        Task<Event> GetAsync(Guid id);
        Event Add(Event item);
        Event Update(Event item);
        Task<IEnumerable<Vendor>> GetVendorsByEventIdAsync(Guid id);
        Task<IEnumerable<Event>> GetEventsByVendorAsync(Guid id);
    }
}
