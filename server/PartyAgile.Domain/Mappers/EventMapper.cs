using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Requests.Event;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Mappers
{
    public interface IEventMapper
    {
        Event Map(AddEventRequest request);
        Event Map(EditEventRequest request);
        EventResponse Map(Event request);
    }

    public class EventMapper : IEventMapper
    {
        public Event Map(AddEventRequest request)
        {
            if (request == null) return null;

            var eventItem = new Event
            {
                Title = request.Title,
                Description = request.Description,
                EventDate = request.EventDate,
                Guests = request.Guets
            };

            if(request.Budget != null)
            {
                eventItem.Budget = new Price { Currency = request.Budget.Currency, Amount = request.Budget.Amount };
            }

            return eventItem;
        }

        public Event Map(EditEventRequest request)
        {
            if (request == null) return null;

            var eventItem = new Event
            {
                Id = request.Id,
                Title = request.Title,
                Description = request.Description,
                EventDate = request.EventDate,
                Guests = request.Guets
            };

            if(request.Budget != null)
            {
                eventItem.Budget = new Price { Amount = request.Budget.Amount, Currency = request.Budget.Currency };
            }

            return eventItem;
        }

        public EventResponse Map(Event eventItem)
        {
            if (eventItem == null) return null;

            var response = new EventResponse
            {
                Id = eventItem.Id,
                Title = eventItem.Title,
                Description = eventItem.Description,
                EventDate = eventItem.EventDate,
                Guests = eventItem.Guests
            };

            if(eventItem.Budget != null)
            {
                response.Budget = new PriceResponse { Currency = eventItem.Budget.Currency, Amount = eventItem.Budget.Amount };
            }

            return response;
        }
    }
}
