using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PartyAgile.API.Hubs;
using PartyAgile.Domain.Requests.Message;
using PartyAgile.Domain.Services;
using System;
using System.Threading.Tasks;

namespace PartyAgile.API.Controllers
{
    [Authorize]
    [Route("api/messages")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IHubContext<MessagesHub> _messagesHubContext;

        public MessageController(IMessageService messageService, IHubContext<MessagesHub> messageHubContext)
        {
            _messageService = messageService;
            _messagesHubContext = messageHubContext;
        }

        [HttpGet("{vendorId:guid}/{eventId:guid}")]
        public async Task<IActionResult> Get(Guid vendorId, Guid eventId)
        {
            var username = HttpContext.User.Identity.Name;
            var result = await _messageService.GetMessagesAsync(vendorId, eventId);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddMessageResquest request)
        {
            var result = await _messageService.AddMessageAsync(request);
            await _messagesHubContext.Clients.Group($"Chat-{request.EventId}-{request.VendorId}")
                .SendAsync("ReceiveMessage", result);

            return Ok(result);
        }
    }
}
