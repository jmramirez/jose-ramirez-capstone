using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PartyAgile.Domain.Entities;
using PartyAgile.Domain.Requests.Event;
using PartyAgile.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace PartyAgile.API.Controllers
{
    
    [Route("api/events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly string _auth0UserInfo;
        private readonly IHttpClientFactory _clientFactory;

        public EventController(IEventService eventService, IConfiguration configuration, IHttpClientFactory clientFactory)
        {
            _eventService = eventService;
            _auth0UserInfo = $"{configuration["Auth0:Authority"]}userinfo";
            _clientFactory = clientFactory;
        } 

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var role = await GetRole();
            var result = await _eventService.GetEventsAsync();
            return Ok(result);
        }
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _eventService.GetEventAsync(new GetEventRequest { Id = id });
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

        private async Task<string> GetRole()
        {

            var request = new HttpRequestMessage(HttpMethod.Get, _auth0UserInfo);
            request.Headers.Add("Authorization", Request.Headers["Authorization"].First());
            var client = _clientFactory.CreateClient();
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)

            {
                var jsonContent = await response.Content.ReadAsStringAsync();
                var user = JsonSerializer.Deserialize<User>(jsonContent, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return user.Role;
            }
            else
            {
                return "";
            }
        }
    }
}




