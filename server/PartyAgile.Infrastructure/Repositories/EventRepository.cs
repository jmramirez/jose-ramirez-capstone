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


        // Method to get List of Future Events
        public async Task<IEnumerable<Event>> GetAsync()
        {
            var now = new DateTimeOffset(DateTime.Today);
            return await _context
                .Events
                .AsNoTracking()
                .Where(x => x.EventDate.CompareTo(now) > 0)
                .ToListAsync();
        }

        //Method to get an Event by id
        public async Task<Event> GetAsync(Guid id)
        {
            var eventItem = await _context.Events
                .AsNoTracking()
                .Where(x => x.Id == id).FirstOrDefaultAsync();

            return eventItem;
        }


        //Method to get an Event by User id
        public async Task<IEnumerable<Event>> GetEventsByUserIdAsync(Guid id)
        {
            var now = new DateTimeOffset(DateTime.Today);
            return await _context
                .Events
                .Where(x => x.CreatorId == id)
                .Where(x => x.EventDate.CompareTo(now) >= 0)
                .ToListAsync();

        }


        //Method to get an Event by Vendor id
        public async Task<IEnumerable<Event>> GetEventsByVendorIdAsync(Guid id)
        {
            var now = new DateTimeOffset(DateTime.Today);
            var items = await _context.VendorsEvent
                .Where(x => x.VendorId == id)
                .Where(x => x.Event.EventDate.CompareTo(now) >= 0)
                .Select(
                e => new Event
                {
                    Id = e.Event.Id,
                    Title = e.Event.Title,
                    Description = e.Event.Description,
                    EventDate = e.Event.EventDate
                }).ToListAsync();

            return items;
        }

        public async Task<Event> GetEventWithVendorsAsync(Guid id)
        {
            var eventItem = await _context.Events
                .AsNoTracking()
                .Where(x => x.Id == id)
                .Include(eventItem => eventItem.EventVendors).ThenInclude(ev => ev.Vendor).FirstOrDefaultAsync();
            return eventItem;
        }

        public async Task<IEnumerable<Vendor>> GetVendorsByEventIdAsync(Guid id, Guid userId)
        {
            var items = await _context.VendorsEvent
                .Where(x => x.EventId == id)
                .Where(x => x.Event.CreatorId == userId)
                .Select(
                v => new Vendor
                    {
                        Id = v.Vendor.Id,
                        Name = v.Vendor.Name,
                        Type = v.Vendor.Type,
                        Budget = new Price { Amount = v.Budget.Amount, Currency = v.Budget.Currency },
                        DepositPaid = new Price { Amount = v.DepositPaid.Amount, Currency = v.DepositPaid.Currency },
                        Tasks = v.Vendor.Tasks
                    }
                ).ToListAsync();

            return items;
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
 