using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Requests.EventTask;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Mappers
{
    public interface IEventTaskMapper
    {
        EventTask Map(AddEventTaskRequest request);
        EventTaskResponse Map(EventTask task);
    }

    public class EventTaskMapper
    {

        public EventTask Map(AddEventTaskRequest request)
        {
            if (request == null) return null;

            var eventTask = new EventTask
            {
                Name = request.Name,
                Description = request.Description,
                VendorId = request.VendorId,
            };
            return eventTask;
        }

        public EventTaskResponse Map(EventTask task)
        {
            if (task == null) return null;

            var response = new EventTaskResponse
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
