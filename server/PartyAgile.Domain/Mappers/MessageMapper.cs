using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Requests.Message;
using PartyAgile.Domain.Responses;

namespace PartyAgile.Domain.Mappers
{
    public interface IMessageMapper
    {
        Message Map(AddMessageResquest request);
        MessageResponse Map(Message request);
    }


    public class MessageMapper : IMessageMapper
    {
        public Message Map(AddMessageResquest request)
        {
            if (request == null) return null;

            var messageItem = new Message
            {
                Content = request.Content,
                Created = request.Created,
                VendorId = request.VendorId,
                EventId = request.EventId
            };

            return messageItem;
        }

        public MessageResponse Map(Message request)
        {
            if (request == null) return null;

            var response = new MessageResponse
            {
                Id = request.Id,
                Content = request.Content,
                Created = request.Created,
                SenderName = request.SenderName
            };

            return response;
        }
    }
}
