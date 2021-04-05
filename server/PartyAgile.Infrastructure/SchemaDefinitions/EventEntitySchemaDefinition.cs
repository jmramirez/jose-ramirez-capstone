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
    public class EventEntitySchemaDefinition : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.ToTable("Events", PartyAgileDbContext.DEFAULT_SCHEMA);
            builder.HasKey(k => k.Id);

            builder.Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(p => p.Description)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(p => p.EventDate)
                .IsRequired();

            builder.Property(x => x.Budget).HasConversion(
                _ => $"{_.Amount}:{_.Currency}",
                _ => new Price
                {
                    Amount = Convert.ToDecimal(_.Split(":", StringSplitOptions.None)[0]),
                    Currency = _.Split(":", StringSplitOptions.None)[1]
                });

        }
    }
}
