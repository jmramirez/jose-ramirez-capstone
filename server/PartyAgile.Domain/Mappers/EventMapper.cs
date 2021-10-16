using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Requests.Event;
using PartyAgile.Domain.Responses;
using System.Linq;

namespace PartyAgile.Domain.Mappers
{
    public interface IEventMapper
    {
        Event Map(AddEventRequest request);
        Event Map(EditEventRequest request);
        EventResponse Map(Event request);

        EventWithVendorsReponse MapWithVendors(Event request);
        //EventWithUserInfo MapWithUser(Event request);
    }

    public class EventMapper : IEventMapper
    {
        private readonly IVendorMapper _vendorMapper;

        public EventMapper(IVendorMapper vendorMapper)
        {
            _vendorMapper = vendorMapper;
        }

        public Event Map(AddEventRequest request)
        {
            if (request == null) return null;

            var eventItem = new Event
            {
                Title = request.Title,
                Description = request.Description,
                EventDate = request.EventDate,
                Guests = request.Guests
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
                Guests = request.Guests,
                CreatorId = request.CreatorId,
                CreatorName = request.CreatorName
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
                Guests = eventItem.Guests,
                CreatorName = eventItem.CreatorName,
                CreatorPhone = eventItem.CreatorPhome
            };

            if(eventItem.Budget != null)
            {
                response.Budget = new PriceResponse { Currency = eventItem.Budget.Currency, Amount = eventItem.Budget.Amount };
            }

            return response;
        }

        public EventWithVendorsReponse MapWithVendors(Event item)
        {
            if (item == null) return null;

            var response = new EventWithVendorsReponse
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                EventDate = item.EventDate,
                Guests = item.Guests
            };

            if (item.Budget != null)
            {
                response.Budget = new PriceResponse { Currency = item.Budget.Currency, Amount = item.Budget.Amount };
            }

            if(item.EventVendors.Count != 0)
            {
                response.Vendors = item.EventVendors.Select(v => _vendorMapper.Map(v.Vendor));
            }

            return response;
        }

    }

}
