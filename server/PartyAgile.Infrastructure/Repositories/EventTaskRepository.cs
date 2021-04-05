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
    public class EventTaskRepository : IEventTaskRepository
    {
        private readonly PartyAgileDbContext _context;

        public IUnitOfWork UnitOfWork => _context;

        public EventTaskRepository(PartyAgileDbContext context)
        {
            _context = context ?? throw new ArgumentException(nameof(context));
        }

        public async Task<IEnumerable<EventTask>> GetAsync()
        {
            return await _context.Tasks
                .AsNoTracking()
                .Include(c => c.Comments)
                .ToListAsync();
        }

        public async Task<EventTask> GetAsync(Guid id)
        {
            var taskItem = await _context.Tasks
                .AsNoTracking()
                .Where(x => x.Id == id).FirstOrDefaultAsync();

            if (taskItem == null) return null;

            _context.Entry(taskItem).State = EntityState.Detached;
            return taskItem;
        }

        public EventTask Add(EventTask taskItem)
        {
            return _context.Tasks.Add(taskItem).Entity;
        }

        public EventTask Update(EventTask taskItem)
        {
            _context.Entry(taskItem).State = EntityState.Modified;
            return taskItem;
        }
    }
}
