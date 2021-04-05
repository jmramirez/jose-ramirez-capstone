using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PartyAgile.Infrastructure.SchemaDefinitions
{
    public class TaskEntitySchemaDefinition : IEntityTypeConfiguration<Task>
    {
        public void Configure(EntityTypeBuilder<Task> builder)
        {
            builder.ToTable("Tasks", PartyAgileDbContext.DEFAULT_SCHEMA);
            builder.HasKey(k => k.Id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(p => p.Description)
                .IsRequired()
                .HasMaxLength(256);

            builder
                .HasOne(v => v.Vendor)
                .WithMany(t => t.Tasks)
                .HasForeignKey(k => k.VendorId);
        }
    }
}
