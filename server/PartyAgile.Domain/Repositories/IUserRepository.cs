using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<bool> AuthenticateAsync(string email, string password, CancellationToken cancellationToken = default);
        Task<bool> SignUpAsync(AppUser user, string password, CancellationToken cancellationToken = default);
        Task<AppUser> GetByEmailAsync(string requestEmail, CancellationToken cancellation = default);
        Task<IList<string>> GetRoles(string requestEmail, CancellationToken cancellationToken = default);
    }
}
