using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Mappers
{
    public interface IVendorEventMapper
    {
        VendorEventResponse Map(VendorEvent item);
    }

    public class VendorEventMapper : IVendorEventMapper
    {
        public VendorEventResponse Map(VendorEvent item)
        {
            if (item == null) return null;

            var response = new VendorEventResponse
            {
                CreatorName = item.Event.CreatorName,
                CreatorPhone = item.Event.CreatorPhome,
                Title = item.Event.Title,
                Description = item.Event.Description,
                Guests = item.Event.Guests,
                EventDate = item.Event.EventDate
            };

            if(item.Budget != null)
            {
                response.Budget = new PriceResponse { Currency = item.Budget.Currency, Amount = item.Budget.Amount };
            }

            if (item.DepositPaid != null)
            {
                response.DepositPaid = new PriceResponse { Currency = item.DepositPaid.Currency, Amount = item.DepositPaid.Amount };
            }

            return response;
        }
    }
}
