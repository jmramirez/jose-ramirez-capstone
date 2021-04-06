﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Requests.VendorTask
{
    public class AddVendorTaskRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTimeOffset DueDate { get; set; }
        public string Status { get; set; }
        public Guid VendorId { get; set; }
    }
}
