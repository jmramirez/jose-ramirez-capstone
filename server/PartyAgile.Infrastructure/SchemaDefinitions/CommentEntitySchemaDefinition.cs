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
    public class CommentEntitySchemaDefinition : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Comments", PartyAgileDbContext.DEFAULT_SCHEMA);
            builder.HasKey(k => k.Id);

            builder.Property(p => p.Content)
                .IsRequired()
                .HasMaxLength(256);

            builder
                .HasOne(t => t.Task)
                .WithMany(c => c.Comments)
                .HasForeignKey(f => f.TaskId);
        }
    }
}
