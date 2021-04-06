using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Repositories
{
    public interface IVendorTaskRepository : IRepository
    {
        Task<IEnumerable<VendorTask>> GetAsync();
        Task<VendorTask> GetAsync(Guid id);
        VendorTask Add(VendorTask item);
        VendorTask Update(VendorTask item);
    }
}
