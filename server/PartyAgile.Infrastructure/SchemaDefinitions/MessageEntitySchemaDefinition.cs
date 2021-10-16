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
    public class MessageEntitySchemaDefinition : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.ToTable("Messages", PartyAgileDbContext.DEFAULT_SCHEMA);

            builder.HasKey(m => m.Id);

            builder.Property(p => p.Content)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(p => p.SenderName)
                .IsRequired()
                .HasMaxLength(256);

            builder
                .HasOne(ev => ev.Event)
                .WithMany(m => m.Messages)
                .HasForeignKey(ev => new { ev.EventId, ev.VendorId });
        }
    }
}
