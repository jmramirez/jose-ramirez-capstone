using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace PartyAgile.API.Hubs
{
    public class MessagesHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.Caller.SendAsync("Message", "Successfully connected");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Caller.SendAsync("Message", "Successfully disconnected");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SubscribeEvent(Guid eventId, Guid vendorId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Chat-{eventId}-{vendorId}");
            await Clients.Caller.SendAsync("Message", "Successfully subcribed");
        }

        public async Task UnsubscribeEvent(Guid eventId, Guid vendorId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Chat-{eventId}-{vendorId}");
            await Clients.Caller.SendAsync("Message", "Successfully unsubcribed");
        }
    }
}
