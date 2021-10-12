using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PartyAgile.Domain.Requests.User;
using PartyAgile.Domain.Requests.Vendor;
using PartyAgile.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartyAgile.API.Controllers
{
    [Authorize]
    [Route("api")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet("vendor")]
        public async Task<IActionResult> Get()
        {
            var result = await _vendorService.GetVendorsAsync();
            return Ok(result);
        }

        [HttpGet("vendor/{vendorId:guid}")]
        public async Task<IActionResult> GetById(Guid vendorId)
        {
            var email = HttpContext.User.Identity.Name;
            var result = await _vendorService.GetVendorById(new GetVendorRequest { Id = vendorId }, email);
            return Ok(result);
        }

        [HttpGet("vendors/{eventId:guid}")]
        public async Task<IActionResult> GetByEvent(Guid eventId)
        {
            var result = await _vendorService.GetByEventId(eventId);
            return Ok(result);
        }

        [HttpGet("vendor/{vendorId:guid}/{eventId:guid}")]
        public async Task<IActionResult> GetEventVendorById(Guid vendorId, Guid eventId)
        {
            var result = await _vendorService.GetEventVendorAsync(new GetVendorEventRequest { EventId = eventId, VendorId = vendorId });
            return Ok(result);
        }

        [HttpGet("vendor/events/{newEvents}")]
        public async Task<IActionResult> GetEvents(string newEvents)
        {
            var username = HttpContext.User.Identity.Name;
            var result = await _vendorService.GetEventsByVendorEmail(new GetUserRequest { Email = username}, newEvents);
            return Ok(result);
        }

        [HttpPost("vendor")]
        public async Task<IActionResult> Post(AddVendorRequest request)
        {
            var result = await _vendorService.AddVendorAsync(request);
            return Ok(result);
        }

        [HttpPost("vendor/event")]
        public async Task<IActionResult> Post(AssignVendorRequest request)
        {
            var result = await _vendorService.AssignAsync(request);
            return Ok(result);
        }

        [HttpPut("vendor/{id:guid}")]
        public async Task<IActionResult> Put(Guid id, EditVendorRequest request)
        {
            var username = HttpContext.User.Identity.Name;
            request.Id = id;
            var result = await _vendorService.EditVendorAsync(request, username);

            return Ok(result);
        }

        [HttpPut("vendor/eventVendor")]
        public async Task<IActionResult> Put(EditVendorEvent request)
        {
            var result = await _vendorService.EditVendorEventAsync(request);
            return Ok(result);
        }
    }
}
