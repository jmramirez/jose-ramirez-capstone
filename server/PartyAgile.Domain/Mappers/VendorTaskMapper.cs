using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Requests.VendorTask;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Mappers
{
    public interface IVendorTaskMapper
    {
        VendorTask Map(AddVendorTaskRequest request);
        VendorTask Map(EditVendorTaskRequest request);
        VendorTaskResponse Map(VendorTask task);
    }

    public class VendorTaskMapper : IVendorTaskMapper
    {

        public VendorTask Map(AddVendorTaskRequest request)
        {
            if (request == null) return null;

            var eventTask = new VendorTask
            {
                Name = request.Name,
                Description = request.Description,
                VendorId = request.VendorId,
            };
            return eventTask;
        }

        public VendorTask Map(EditVendorTaskRequest request)
        {
            if (request == null) return null;

            var verdorTask = new VendorTask
            {
                Id = request.Id,
                Name = request.Name,
                Description = request.Description,
                Status = request.Status,
                ColorStatus = request.ColorStatus
            };

            return verdorTask;
        }

        public VendorTaskResponse Map(VendorTask task)
        {
            if (task == null) return null;

            var response = new VendorTaskResponse
            {
                Id = task.Id,
                Name = task.Name,
                Description = task.Description,
                VendorId = task.VendorId
            };

            return response;
        }
    }
}
