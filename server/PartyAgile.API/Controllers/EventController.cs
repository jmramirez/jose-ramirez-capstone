﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PartyAgile.Domain.Requests.Event;
using PartyAgile.Domain.Services;
using System;
using System.Net.Http;
using System.Threading.Tasks;
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
            var username = HttpContext.User.Identity.Name;
            var result = await _eventService.GetEventAsync(new GetEventRequest { Id = id }, username);
            if(result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpGet("{id:guid}/eventvendors")]
        public async Task<IActionResult> GetEventVendorByEventId(Guid id)
        {
            var username = HttpContext.User.Identity.Name;
            var result = await _eventService.GetEventVendorByVendorId(new GetEventRequest { Id = id }, username);
            return Ok(result);
        }

        [HttpGet("{id:guid}/vendors")]
        public async Task<IActionResult> GetWithVendorById(Guid id)
        {
            var email = HttpContext.User.Identity.Name;
            var result = await _eventService.GetVendorsEventAsync(new GetEventRequest { Id = id }, email);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddEventRequest request)
        {
            var username = HttpContext.User.Identity.Name;
            var result = await _eventService.AddEventAsync(request, username);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, null);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Put(Guid id, EditEventRequest request)
        {
            var username = HttpContext.User.Identity.Name;
            request.Id = id;
            var result = await _eventService.EditEventAsync(request, username);

            return Ok(result);
        }
    }
}




