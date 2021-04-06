using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Repositories;
using PartyAgile.Infrastructure.SchemaDefinitions;
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
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorTask> Tasks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<VendorEvent> VendorsEvent { get; set; }

        public PartyAgileDbContext(DbContextOptions<PartyAgileDbContext> options) : base(options) {  }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EventEntitySchemaDefinition());
            modelBuilder.ApplyConfiguration(new VendorEntitySchemaDefinition());
            modelBuilder.ApplyConfiguration(new TaskEntitySchemaDefinition());
            modelBuilder.ApplyConfiguration(new CommentEntitySchemaDefinition());
            modelBuilder.ApplyConfiguration(new VendorEventEntitySchemaDefinition());
            base.OnModelCreating(modelBuilder);
        }

        public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
