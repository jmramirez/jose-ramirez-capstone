using PartyAgile.Domain.Mappers;
using PartyAgile.Domain.Repositories;
using PartyAgile.Domain.Requests.Message;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Services
{
    public interface IMessageService
    {
        Task<MessageResponse> AddMessageAsync(AddMessageResquest request);
        Task<IEnumerable<MessageResponse>> GetMessagesAsync(Guid vendorId, Guid eventId);
    }

    public class MessageService : IMessageService
    {
        public readonly IMessageRepository _messageRepository;
        public readonly IUserRepository _userRepository;
        public readonly IMessageMapper _messageMapper;
        
        public MessageService(IUserRepository userRepository, IMessageRepository messageRepository, IMessageMapper messageMapper)
        {
            _userRepository = userRepository;
            _messageRepository = messageRepository;
            _messageMapper = messageMapper;
        }

        public async Task<MessageResponse> AddMessageAsync(AddMessageResquest request)
        {
            if (request == null) throw new ArgumentNullException();
            var messageItem = _messageMapper.Map(request);
            var result = _messageRepository.Add(messageItem);
            await _messageRepository.UnitOfWork.SaveChangesAsync();

            return _messageMapper.Map(result);
            
        }

        public async Task<IEnumerable<MessageResponse>> GetMessagesAsync(Guid vendorId, Guid eventId)
        {
            var result = await _messageRepository.GetMessagesAsync(vendorId, eventId);
            return result.Select(x => _messageMapper.Map(x));
        }
    }
}
