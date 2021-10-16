using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Responses
{
    public class MessageResponse
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTimeOffset Created { get; set; }
        public string SenderName { get; set; }
    }
}
