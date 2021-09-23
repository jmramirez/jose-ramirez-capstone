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
        Task<EventResponse> GetEventAsync(GetEventRequest request);
        Task<EventWithVendorsReponse> GetEventWithVendorsAsync(GetEventRequest request);
        Task<IEnumerable<VendorWithTaskResponse>> GetVendorsEventAsync(GetEventRequest request);
        Task<EventResponse> AddEventAsync(AddEventRequest request, string username);
        Task<EventResponse> EditEventAsync(EditEventRequest request);
        Task<IEnumerable<EventResponse>> GetEventsByVendorIdAsync(GetVendorRequest request);
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

        public async Task<IEnumerable<EventResponse>> GetEventsByVendorIdAsync(GetVendorRequest request)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var result = await _eventRepository.GetEventsByVendorAsync(request.Id);
            return result.Select(x => _eventMapper.Map(x));
        }

        public async Task<EventResponse> GetEventAsync(GetEventRequest request)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var entity = await _eventRepository.GetAsync(request.Id);
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




        public async Task<IEnumerable<VendorWithTaskResponse>> GetVendorsEventAsync(GetEventRequest request)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var events = await _eventRepository.GetVendorsByEventIdAsync(request.Id);
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

        public async Task<EventResponse> EditEventAsync(EditEventRequest request)
        {
            var existingEvent = await _eventRepository.GetAsync(request.Id);

            if (existingEvent == null) throw new ArgumentException($"Entity with {request.Id} is not present");

            var entity = _eventMapper.Map(request);
            var result = _eventRepository.Update(entity);

            await _eventRepository.UnitOfWork.SaveChangesAsync();
            return _eventMapper.Map(result);
        }
    }
}
