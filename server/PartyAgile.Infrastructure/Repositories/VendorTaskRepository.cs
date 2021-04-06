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
    public class VendorTaskRepository : IVendorTaskRepository
    {
        private readonly PartyAgileDbContext _context;

        public IUnitOfWork UnitOfWork => _context;

        public VendorTaskRepository(PartyAgileDbContext context)
        {
            _context = context ?? throw new ArgumentException(nameof(context));
        }

        public async Task<IEnumerable<VendorTask>> GetAsync()
        {
            return await _context.Tasks
                .AsNoTracking()
                .Include(c => c.Comments)
                .ToListAsync();
        }

        public async Task<VendorTask> GetAsync(Guid id)
        {
            var taskItem = await _context.Tasks
                .AsNoTracking()
                .Where(x => x.Id == id).FirstOrDefaultAsync();

            if (taskItem == null) return null;

            _context.Entry(taskItem).State = EntityState.Detached;
            return taskItem;
        }

        public VendorTask Add(VendorTask taskItem)
        {
            return _context.Tasks.Add(taskItem).Entity;
        }

        public VendorTask Update(VendorTask taskItem)
        {
            _context.Entry(taskItem).State = EntityState.Modified;
            return taskItem;
        }
    }
}
