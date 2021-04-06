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
    public interface IVendorMapper
    {
        Vendor Map(AddVendorRequest request);
        Vendor Map(EditVendorRequest request);
        VendorResponse Map(Vendor request);
        VendorWithTaskResponse MapVendor(Vendor vendorItem);
    }

    public class VendorMapper : IVendorMapper
    {
        public Vendor Map(AddVendorRequest request)
        {
            if (request == null) return null;

            var vendorItem = new Vendor
            {
               Name = request.Name,
               Type = request.Type,
               ContactName = request.ContactName,
               ContactEmail = request.ContactEmail,
               Address = request.Address,
            };

            if(request.Budget != null)
            {
                vendorItem.Budget = new Price { Amount = request.Budget.Amount, Currency = request.Budget.Currency };
            }

            if (request.DepositPaid != null)
            {
                vendorItem.DepositPaid = new Price { Amount = request.DepositPaid.Amount, Currency = request.DepositPaid.Currency };
            }

            return vendorItem;
        }

        public Vendor Map(EditVendorRequest request)
        {
            if (request == null) return null;

            var vendorItem = new Vendor
            {
                Id = request.Id,
                Name = request.Name,
                Type = request.Type,
                ContactName = request.ContactName,
                ContactEmail = request.ContactEmail,
                Address = request.Address,
            };

            if (request.Budget != null)
            {
                vendorItem.Budget = new Price { Amount = request.Budget.Amount, Currency = request.Budget.Currency };
            }

            if (request.DepositPaid != null)
            {
                vendorItem.DepositPaid = new Price { Amount = request.DepositPaid.Amount, Currency = request.DepositPaid.Currency };
            }

            return vendorItem;
        }

        public VendorResponse Map(Vendor vendorItem)
        {
            var response = new VendorResponse
            {
                Id = vendorItem.Id,
                Name = vendorItem.Name,
                Type = vendorItem.Type,
                ContactName = vendorItem.ContactName,
            };

            if (vendorItem.Budget != null)
            {
                vendorItem.Budget = new Price { Amount = vendorItem.Budget.Amount, Currency = vendorItem.Budget.Currency };
            }

            if (vendorItem.DepositPaid != null)
            {
                vendorItem.DepositPaid = new Price { Amount = vendorItem.DepositPaid.Amount, Currency = vendorItem.DepositPaid.Currency };
            }

            return response;
        }

        public VendorWithTaskResponse MapVendor(Vendor vendorItem)
        {
            var response = new VendorWithTaskResponse
            {
                Id = vendorItem.Id,
                Name = vendorItem.Name,
                Tasks = vendorItem.Tasks.Select(x => new VendorTaskResponse { Id = x.Id, Description = x.Description, Name = x.Name, Status = x.Status })
            };
            return response;
        }
    }
}
