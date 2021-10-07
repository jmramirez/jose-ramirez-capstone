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
    public class VendorEntitySchemaDefinition : IEntityTypeConfiguration<Vendor>
    {
        public void Configure(EntityTypeBuilder<Vendor> builder)
        {
            builder.ToTable("Vendors", PartyAgileDbContext.DEFAULT_SCHEMA);
            builder.HasKey(k => k.Id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(p => p.Type)
                .IsRequired()
                .HasMaxLength(128);

            builder.Property(p => p.ContactName)
                .IsRequired()
                .HasMaxLength(128);

            builder
                .HasOne(p => p.User)
                .WithMany(p => p.Vendors)
                .HasForeignKey(fk => fk.UserId);

            
            builder.Property(p => p.Address)
                .IsRequired();

            builder.Property(p => p.ContactEmail)
                .IsRequired();

        }
    }
}
