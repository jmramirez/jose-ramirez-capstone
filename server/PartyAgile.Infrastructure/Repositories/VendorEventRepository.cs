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
        
        public async Task<VendorEvent> GetByEventIdAsync(Guid id)
        {
            var item =await _context.VendorsEvent
                .AsNoTracking()
                .Where(x => x.EventId == id)
                .Include(item => item.Event)
                .Include(item => item.Vendor).FirstOrDefaultAsync();

            return item;
        }
    }
}
