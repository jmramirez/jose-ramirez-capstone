using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Repositories
{
    public interface IVendorRepository : IRepository
    {
        Task<IEnumerable<Vendor>> GetAsync();
        Task<Vendor> GetByUserId(Guid userId);
        Task<Vendor> GetAsync(Guid eventId, Guid vendorId);
        Task<IEnumerable<Vendor>> GetVendorTasksByEventId(Guid eventId);
        Vendor Add(Vendor item);
        Vendor Update(Vendor item);
    }
}
