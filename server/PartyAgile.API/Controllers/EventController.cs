using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PartyAgile.Domain.Requests.Event;
using PartyAgile.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartyAgile.API.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
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




