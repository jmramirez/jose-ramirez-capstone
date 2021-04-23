using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Requests.Vendor;
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
        VendorEvent MapRequest(AssignVendorRequest request);

        VendorEvent Map(EditVendorEvent request);

    }

    public class VendorEventMapper : IVendorEventMapper
    {
        public VendorEventResponse Map(VendorEvent item)
        {
            var response = new VendorEventResponse { };
            

            if (item == null) return null;

            if(item.Vendor != null)
            {
                response.CreatorName = item.Event.CreatorName;
                response.CreatorPhone = item.Event.CreatorPhome;
                response.Title = item.Event.Title;
                response.Description = item.Event.Description;
                response.Guests = item.Event.Guests;
                response.EventDate = item.Event.EventDate;
                
            }


            if (item.Budget != null)
            {
                response.Budget = new PriceResponse { Currency = item.Budget.Currency, Amount = item.Budget.Amount };
            };

            if (item.DepositPaid != null)
            {
                response.DepositPaid = new PriceResponse { Currency = item.DepositPaid.Currency, Amount = item.DepositPaid.Amount };
            };

            return response;
        }

        public VendorEvent MapRequest(AssignVendorRequest request)
        {
            if (request == null) return null;

            var vendorEvent = new VendorEvent
            {
                EventId = request.EventId,
                VendorId = request.VendorId
            };
            if (request.Budget != null)
            {
                vendorEvent.Budget = new Price { Amount = request.Budget.Amount, Currency = request.Budget.Currency };
            }

            if (request.DepositPaid != null)
            {
                vendorEvent.DepositPaid = new Price { Amount = request.DepositPaid.Amount, Currency = request.DepositPaid.Currency };
            }

            return vendorEvent;
        }

        public VendorEvent Map(EditVendorEvent request)
        {
            if (request == null) return null;

            var vendorEvent = new VendorEvent
            {
                EventId = request.EventId,
                VendorId = request.VendorId
            };

            if (request.Budget != null)
            {
                vendorEvent.Budget = new Price { Amount = request.Budget.Amount, Currency = request.Budget.Currency };
            }

            if (request.DepositPaid != null)
            {
                vendorEvent.DepositPaid = new Price { Amount = request.DepositPaid.Amount, Currency = request.DepositPaid.Currency };
            }

            return vendorEvent;

        }

    }
}
