using PartyAgile.Domain.Mappers;
using PartyAgile.Domain.Repositories;
using PartyAgile.Domain.Requests.Event;
using PartyAgile.Domain.Requests.Vendor;
using PartyAgile.Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PartyAgile.Domain.Services
{
    public interface IEventService
    {
        Task<IEnumerable<EventResponse>> GetEventsAsync();
        Task<EventResponse> GetEventAsync(GetEventRequest request, string username);
        Task<EventWithVendorsReponse> GetEventWithVendorsAsync(GetEventRequest request);
        Task<IEnumerable<VendorWithTaskResponse>> GetVendorsEventAsync(GetEventRequest request, string email);
        Task<EventResponse> AddEventAsync(AddEventRequest request, string username);
        Task<EventResponse> EditEventAsync(EditEventRequest request, string username);
        /*Task<IEnumerable<EventResponse>> GetEventsByVendorIdAsync(GetVendorRequest request);*/
        Task<VendorEventResponse> GetEventVendorByEventId(GetEventRequest request);
    }

    public class EventService : IEventService
    {
        private readonly IEventMapper _eventMapper;
        private readonly IVendorMapper _vendorMapper;
        private readonly IEventRepository _eventRepository;
        private readonly IVendorEventMapper _vendorEventMapper;
        private readonly IVendorEventRepository _vendorEventRepository;
        private readonly IUserRepository _userRepository;

        public EventService(IEventRepository eventRepository, IEventMapper eventMapper, IVendorMapper vendorMapper, IVendorEventRepository vendorEventRepository, IVendorEventMapper vendorEventMapper, IUserRepository userRepository)
        {
            _eventMapper = eventMapper;
            _eventRepository = eventRepository;
            _vendorMapper = vendorMapper;
            _vendorEventMapper = vendorEventMapper;
            _vendorEventRepository = vendorEventRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<EventResponse>> GetEventsAsync()
        {
            var result = await _eventRepository.GetAsync();
            return result.Select(x => _eventMapper.Map(x));
        }

        public async Task<EventResponse> GetEventAsync(GetEventRequest request, string username)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var user = await _userRepository.GetByEmailAsync(username);
            var entity = await _eventRepository.GetAsync(request.Id, user.Id);
            return _eventMapper.Map(entity);
        }

        public async Task<VendorEventResponse> GetEventVendorByEventId(GetEventRequest request)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var entity = await _vendorEventRepository.GetByEventIdAsync(request.Id);
            return _vendorEventMapper.Map(entity);
        }

        public async Task<EventWithVendorsReponse> GetEventWithVendorsAsync(GetEventRequest request)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var entity = await _eventRepository.GetEventWithVendorsAsync(request.Id);
            return _eventMapper.MapWithVendors(entity);
        }




        public async Task<IEnumerable<VendorWithTaskResponse>> GetVendorsEventAsync(GetEventRequest request, string email)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var user = await _userRepository.GetByEmailAsync(email);
            var events = await _eventRepository.GetVendorsByEventIdAsync(request.Id, user.Id);
            var result = events.Select(x => _vendorMapper.MapVendor(x));

            return result;
        }

        public async Task<EventResponse> AddEventAsync(AddEventRequest request, string username)
        {
            var user = await _userRepository.GetByEmailAsync(username);
            var eventItem = _eventMapper.Map(request);
            eventItem.CreatorId = user.Id;
            eventItem.CreatorName = user.FirstName + ' ' + user.LastName;
            eventItem.CreatedAt = DateTimeOffset.UtcNow;
            var result = _eventRepository.Add(eventItem);
            await _eventRepository.UnitOfWork.SaveChangesAsync();

            return _eventMapper.Map(result);
        }

        public async Task<EventResponse> EditEventAsync(EditEventRequest request, string username)
        {
            var user = await _userRepository.GetByEmailAsync(username);
            var existingEvent = await _eventRepository.GetAsync(request.Id, user.Id);

            if (existingEvent == null) throw new ArgumentException($"Entity with {request.Id} is not present");
            request.CreatorId = user.Id;
            request.CreatorName = user.FirstName + " " + user.LastName;
            var entity = _eventMapper.Map(request);
            var result = _eventRepository.Update(entity);

            await _eventRepository.UnitOfWork.SaveChangesAsync();
            return _eventMapper.Map(result);
        }
    }
}
