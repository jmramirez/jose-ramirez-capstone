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

        public async Task<Vendor> GetAsync(Guid id)
        {
            var vendorItem = await _context.Vendors
                .AsNoTracking()
                .Where(x => x.Id == id).FirstOrDefaultAsync();

            if (vendorItem == null) return null;

            _context.Entry(vendorItem).State = EntityState.Detached;
            return vendorItem;
        }

        public async Task<IEnumerable<Vendor>> GetVendorTasksByEventId(Guid eventId)
        {
            var items = await _context.VendorsEvent.Select(
                v => new Vendor { 
                    Name = v.Vendor.Name,
                    Type = v.Vendor.Type,
                    Budget = new Price { Amount = v.Vendor.Budget.Amount, Currency = v.Vendor.Budget.Currency},
                    DepositPaid = new Price { Amount = v.Vendor.DepositPaid.Amount, Currency = v.Vendor.DepositPaid.Currency},
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
