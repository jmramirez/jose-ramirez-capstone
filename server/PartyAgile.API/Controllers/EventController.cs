using PartyAgile.API.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PartyAgile.Domain.Requests.Event;
using PartyAgile.Domain.Services;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace PartyAgile.API.Controllers
{

    [Route("api/events")]
    [ApiController]
    [JsonException]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IHttpClientFactory _clientFactory;

        public EventController(IEventService eventService, IConfiguration configuration, IHttpClientFactory clientFactory)
        {
            _eventService = eventService;
            _clientFactory = clientFactory;
        } 

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _eventService.GetEventsAsync();
            return Ok(result);
        }
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _eventService.GetEventAsync(new GetEventRequest { Id = id });
            if(result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        /*[HttpGet("{id:guid}/vendors")]
        public async Task<IActionResult> GetEventWithVendorsById(Guid id)
        {
            var result = await _eventService.GetEventWithVendorsAsync(new GetEventRequest { Id = id });
            return Ok(result);
        }*/

        [HttpGet("{id:guid}/vendors")]
        public async Task<IActionResult> GetWithVendorById(Guid id)
        {
            var result = await _eventService.GetVendorsEventAsync(new GetEventRequest { Id = id });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEventRequest request)
        {
            var result = await _eventService.AddEventAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, null);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Put(Guid id, EditEventRequest request)
        {
            request.Id = id;
            var result = await _eventService.EditEventAsync(request);

            return Ok(result);
        }
    }
}




