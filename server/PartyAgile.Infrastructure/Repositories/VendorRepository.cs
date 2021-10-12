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
    public class VendorRepository : IVendorRepository
    {
        private readonly PartyAgileDbContext _context;

        public IUnitOfWork UnitOfWork => _context;

        public VendorRepository(PartyAgileDbContext context)
        {
            _context = context ?? throw new ArgumentException(nameof(context));
        }

        public async Task<IEnumerable<Vendor>> GetAsync()
        {
            return await _context
                .Vendors
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Vendor> GetById(Guid vendorId, Guid userId)
        {
            return await _context
                .Vendors
                .AsNoTracking()
                .Where(k => k.Id == vendorId)
                .Where(u => u.UserId == userId)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Vendor>> GetByEventId(Guid eventId)
        {
            return await _context
                .VendorsEvent
                .Where(x => x.EventId == eventId)
                .Select(
                v => new Vendor
                {
                    Id = v.Vendor.Id,
                    Name = v.Vendor.Name
                })
                .ToListAsync();
        }

        public async Task<Vendor> GetAsync(Guid eventId, Guid vendorId)
        {
            var vendorItem = await _context.Vendors
                .AsNoTracking()
                .Where(x => x.Id == vendorId).FirstOrDefaultAsync();

            if (vendorItem == null) return null;

            _context.Entry(vendorItem).State = EntityState.Detached;
            return vendorItem;
        }

        public async Task<Vendor> GetByUserId(Guid userId)
        {
            return await _context
                .Vendors
                .AsNoTracking()
                .Where(x => x.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Vendor>> GetVendorTasksByEventId(Guid eventId)
        {
            var items = await _context.VendorsEvent.Select(
                v => new Vendor { 
                    Name = v.Vendor.Name,
                    Type = v.Vendor.Type,
                    Tasks = v.Vendor.Tasks
                }).ToListAsync();

            return items;
        }

        public Vendor Add(Vendor vendorItem)
        {
            return _context.Vendors
                .Add(vendorItem).Entity;
        }

        public Vendor Update(Vendor vendorItem)
        {
            _context.Entry(vendorItem).State = EntityState.Modified;
            return vendorItem;
        }
    }
}
