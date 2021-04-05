using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Repositories
{
    public interface IEventTaskRepository : IRepository
    {
        Task<IEnumerable<EventTask>> GetAsync();
        Task<EventTask> GetAsync(Guid id);
        EventTask Add(EventTask item);
        EventTask Update(EventTask item);
    }
}
