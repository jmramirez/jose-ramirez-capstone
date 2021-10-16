using Microsoft.EntityFrameworkCore;
using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Infrastructure.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly PartyAgileDbContext _context;

        public IUnitOfWork UnitOfWork => _context;

        public MessageRepository(PartyAgileDbContext context)
        {
            _context = context ?? throw new ArgumentException(nameof(context));
        }

        public Message Add(Message messageItem)
        {
            return _context.Messages
                .Add(messageItem).Entity;
        }

        public async Task<IEnumerable<Message>> GetMessagesAsync(Guid vendorId, Guid eventId)
        {
            var now = new DateTimeOffset(DateTime.Now);
            var messages = await _context.Messages
                .Where(e => e.EventId == eventId)
                .Where(v => v.VendorId == vendorId)
                .OrderByDescending(d => d.Created)
                .ToListAsync();

            return messages;
        }
    }
}
