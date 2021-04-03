using System;
using Microsoft.AspNetCore.Identity;

namespace PartyAgile.Domain.Entities
{
    public class AppRole : IdentityRole<Guid>
    {
        public AppRole() { }

        public AppRole(string name)
        {
            Name = name;
        }
    }
}