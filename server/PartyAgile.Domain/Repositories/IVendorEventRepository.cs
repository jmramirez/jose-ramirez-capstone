﻿using PartyAgile.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Repositories
{
    public interface IVendorEventRepository : IRepository
    {
        VendorEvent Add(VendorEvent item);
    }
}