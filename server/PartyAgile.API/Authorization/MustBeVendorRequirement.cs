using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartyAgile.API.Authorization
{
    public class MustBeVendorRequirement : IAuthorizationRequirement
    {
        public MustBeVendorRequirement()
        {

        }
    }
}
