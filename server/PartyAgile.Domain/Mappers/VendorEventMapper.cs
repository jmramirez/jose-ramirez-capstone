using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Requests.Vendor;
using PartyAgile.Domain.Responses;

namespace PartyAgile.Domain.Mappers
{
    public interface IVendorEventMapper
    {
        VendorEventResponse Map(VendorEvent item);
        EventVendorResponse MapVendor(VendorEvent item);
        VendorEventSimpleResponse MapSimple(VendorEvent item);
        VendorEvent MapRequest(AssignVendorRequest request);

        VendorEvent Map(EditVendorEvent request);

    }

    public class VendorEventMapper : IVendorEventMapper
    {
        public VendorEventResponse Map(VendorEvent item)
        {
            var response = new VendorEventResponse { };
            

            if (item == null) return null;


            response.Id = item.EventId;
            response.CreatorName = item.Event.CreatorName;
            response.CreatorPhone = item.Event.CreatorPhome;
            response.Title = item.Event.Title;
            response.Description = item.Event.Description;
            response.Guests = item.Event.Guests;
            response.EventDate = item.Event.EventDate;

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

        public EventVendorResponse MapVendor(VendorEvent item)
        {
            var response = new EventVendorResponse { };


            if (item == null) return null;


            response.Id = item.VendorId;
            response.Name = item.Vendor.Name;
            response.Type = item.Vendor.Type;

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

        public VendorEventSimpleResponse MapSimple(VendorEvent item)
        {
            var response = new VendorEventSimpleResponse { };
            if (item == null) return null;

            response.EventId = item.EventId;
            response.VendorId = item.VendorId;

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
