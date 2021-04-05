using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PartyAgile.Infrastructure
{
    public class PartyAgileDbContext : IdentityDbContext<AppUser, AppRole, Guid>, IUnitOfWork
    {
        public const string DEFAULT_SCHEMA = "partyagile";

        public DbSet<Event> Events { get; set; }

        public PartyAgileDbContext(DbContextOptions<PartyAgileDbContext> options) : base(options) {  }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
