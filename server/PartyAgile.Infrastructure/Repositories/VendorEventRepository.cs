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
    }
}
