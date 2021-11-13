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
    public class RolesSchemaDefinition : IEntityTypeConfiguration<AppRole>
    {
        public void Configure(EntityTypeBuilder<AppRole> builder)
        {
            builder.HasData(
                new AppRole
                {
                    Id = Guid.NewGuid(),
                    Name = "Planner",
                    NormalizedName = "PLANNER"
                },
                new AppRole
                {
                    Id = Guid.NewGuid(),
                    Name = "Vendor",
                    NormalizedName = "VENDOR"
                }
            );
        }
    }
}
