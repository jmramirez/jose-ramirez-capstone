﻿using Microsoft.EntityFrameworkCore;
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

        public async Task<Event> GetEventWithVendorsAsync(Guid id)
        {
            var eventItem = await _context.Events
                .AsNoTracking()
                .Where(x => x.Id == id)
                .Include(eventItem => eventItem.EventVendors).ThenInclude(ev => ev.Vendor).FirstOrDefaultAsync();
            return eventItem;
        }

        public async Task<IEnumerable<Vendor>> GetVendorsByEventIdAsync(Guid id)
        {
            var items = await _context.VendorsEvent.Where(x => x.EventId == id).Select(
                v => new Vendor
                {
                    Id = v.Vendor.Id,
                    Name = v.Vendor.Name,
                    Type = v.Vendor.Type,
                    Budget = new Price { Amount = v.Vendor.Budget.Amount, Currency = v.Vendor.Budget.Currency },
                    DepositPaid = new Price { Amount = v.Vendor.DepositPaid.Amount, Currency = v.Vendor.DepositPaid.Currency },
                    Tasks = v.Vendor.Tasks
                }).ToListAsync();

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
