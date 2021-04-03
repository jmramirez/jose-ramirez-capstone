using System;
using Microsoft.AspNetCore.Identity;

namespace PartyAgile.Domain.Entities
{
    public class AppUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}