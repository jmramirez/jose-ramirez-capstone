using Microsoft.EntityFrameworkCore;
using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Infrastructure.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly PartyAgileDbContext _context;

        public IUnitOfWork UnitOfWork => _context;

        public EventRepository(PartyAgileDbContext context)
        {
            _context = context ?? throw new ArgumentException(nameof(context));
        }


        // Method to get List of Events
        public async Task<IEnumerable<Event>> GetAsync()
        {
            return await _context
                .Events
                .AsNoTracking()
                .ToListAsync();
        }

        //Method to get an Event by id
        public async Task<Event> GetAsync(Guid id)
        {
            var eventItem = await _context.Events
                .AsNoTracking()
                .Where(x => x.Id == id)
                .Include(x => x.Vendors).FirstOrDefaultAsync();

            return eventItem;
        }

        public Event Add(Event eventItem)
        {
            return _context.Events
                .Add(eventItem).Entity;
        }

        public Event Update(Event eventItem)
        {
            _context.Entry(eventItem).State = EntityState.Modified;
            return eventItem;
        }
    }
}
