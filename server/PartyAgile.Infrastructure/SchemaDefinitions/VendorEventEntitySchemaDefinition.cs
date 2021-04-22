using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Infrastructure.SchemaDefinitions
{
    public class VendorEventEntitySchemaDefinition : IEntityTypeConfiguration<VendorEvent>
    {
        public void Configure(EntityTypeBuilder<VendorEvent> builder)
        {
            builder.ToTable("EventVendors", PartyAgileDbContext.DEFAULT_SCHEMA);

            builder.HasKey(ev => new { ev.EventId, ev.VendorId });

            builder
                .HasOne(ev => ev.Vendor)
                .WithMany(v => v.Events)
                .HasForeignKey(k => k.VendorId);

            builder
                .HasOne(ev => ev.Event)
                .WithMany(e => e.EventVendors)
                .HasForeignKey(k => k.EventId);

            builder.Property(p => p.Budget).HasConversion(
                _ => $"{_.Amount}:{_.Currency}",
                _ => new Price
                {
                    Amount = Convert.ToDecimal(_.Split(":", StringSplitOptions.None)[0]),
                    Currency = _.Split(":", StringSplitOptions.None)[1]
                });


            builder.Property(p => p.DepositPaid).HasConversion(
                _ => $"{_.Amount}:{_.Currency}",
                _ => new Price
                {
                    Amount = Convert.ToDecimal(_.Split(":", StringSplitOptions.None)[0]),
                    Currency = _.Split(":", StringSplitOptions.None)[1]
                });
        }
    }
}
