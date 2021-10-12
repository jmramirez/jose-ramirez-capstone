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
    public class VendorEventRepository : IVendorEventRepository
    {
        private readonly PartyAgileDbContext _context;

        public VendorEventRepository(PartyAgileDbContext context)
        {
            _context = context;
        }

        public IUnitOfWork UnitOfWork => _context;

        public VendorEvent Add(VendorEvent item)
        {
            return _context.VendorsEvent.Add(item).Entity;
        }

        public async Task<IEnumerable<VendorEvent>> GetVendorEvents(Guid vendorId, string timing)
        {
            var now = new DateTimeOffset(DateTime.Today);

            if(timing == "newEvents")
            {
                return await _context.VendorsEvent
                .Where(x => x.VendorId == vendorId)
                .Where(x => x.Event.EventDate.CompareTo(now) >= 0)
                .Include(e => e.Event)
                .AsNoTracking()
                .ToListAsync();
            }
            else if(timing == "oldEvents")
            {
                return await _context.VendorsEvent
                .Where(x => x.VendorId == vendorId)
                .Where(x => x.Event.EventDate.CompareTo(now) < 0)
                .Include(e => e.Event)
                .AsNoTracking()
                .ToListAsync();
            }
            else
            {
                return null;
            }
        }

        public async Task<VendorEvent> GetEventVendor(Guid vendorId, Guid eventId)
        {
            var vendorEvent = await _context
                .VendorsEvent
                .Where(x => x.VendorId == vendorId && x.EventId == eventId)
                .Include(e => e.Event)
                .FirstOrDefaultAsync();

            if (vendorEvent == null) return null;

            _context.Entry(vendorEvent).State = EntityState.Detached;
            return vendorEvent;
        }


        public async Task<IEnumerable<VendorEvent>> GetByEventIdAsync(Guid id)
        {
            var item =await _context.VendorsEvent
                .AsNoTracking()
                .Where(x => x.EventId == id)
                .Include(item => item.Vendor).ToListAsync();

            return item;
        }

        public VendorEvent Update(VendorEvent vendorItem)
        {
            _context.Entry(vendorItem).State = EntityState.Modified;
            return vendorItem;
        }

        
    }
}
