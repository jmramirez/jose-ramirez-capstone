using PartyAgile.Domain.Mappers;
using PartyAgile.Domain.Repositories;
using PartyAgile.Domain.Requests.Event;
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
        Task<EventResponse> AddEventAsync(AddEventRequest request);
        Task<EventResponse> EditEventAsync(EditEventRequest request);
    }

    public class EventService : IEventService
    {
        private readonly IEventMapper _eventMapper;
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository, IEventMapper eventMapper)
        {
            _eventMapper = eventMapper;
            _eventRepository = eventRepository;
        }

        public async Task<IEnumerable<EventResponse>> GetEventsAsync()
        {
            var result = await _eventRepository.GetAsync();
            return result.Select(x => _eventMapper.Map(x));
        }

        public async Task<EventResponse> GetEventAsync(GetEventRequest request)
        {
            if (request?.Id == null) throw new ArgumentNullException();
            var entity = await _eventRepository.GetAsync(request.Id);
            return _eventMapper.Map(entity);
        }

        public async Task<EventResponse> AddEventAsync(AddEventRequest request)
        {
            var eventItem = _eventMapper.Map(request);
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
