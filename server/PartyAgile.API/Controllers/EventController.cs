using PartyAgile.API.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PartyAgile.Domain.Requests.Event;
using PartyAgile.Domain.Services;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using PartyAgile.Domain.Requests.Vendor;
using Microsoft.AspNetCore.Authorization;

namespace PartyAgile.API.Controllers
{
    [Authorize]
    [Route("api/events")]
    [ApiController]
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

        [HttpGet("{id:guid}/vendor")]
        public async Task<IActionResult> GetEventByVendorById(Guid id)
        {
            var result = await _eventService.GetEventsByVendorIdAsync(new GetVendorRequest { Id = id });
            return Ok(result);
        }

        [HttpGet("{id:guid}/eventvendor")]
        public async Task<IActionResult>  GetEventVendorByEventId(Guid id)
        {
            var result = await _eventService.GetEventVendorByEventId(new GetEventRequest { Id = id });
            return Ok(result);
        }

        [HttpGet("{id:guid}/vendors")]
        public async Task<IActionResult> GetWithVendorById(Guid id)
        {
            var result = await _eventService.GetVendorsEventAsync(new GetEventRequest { Id = id });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEventRequest request)
        {
            var username = HttpContext.User.Identity.Name;
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




