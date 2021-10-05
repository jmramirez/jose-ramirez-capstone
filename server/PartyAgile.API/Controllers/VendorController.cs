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
    [Route("api/vendor")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _vendorService.GetVendorsAsync();
            return Ok(result);
        }

        [HttpGet("{eventId:guid}")]
        public async Task<IActionResult> GetByEvent(Guid eventId)
        {
            var result = await _vendorService.GetByEventId(eventId);
            return Ok(result);
        }

        [HttpGet("{vendorId:guid}/{eventId:guid}")]
        public async Task<IActionResult> GetById(Guid vendorId, Guid eventId)
        {
            var result = await _vendorService.GetVendorAsync(new GetVendorEventRequest { EventId = eventId, VendorId = vendorId });
            return Ok(result);
        }

        [HttpGet("events/{newEvents}")]
        public async Task<IActionResult> GetEvents(string newEvents)
        {
            var username = HttpContext.User.Identity.Name;
            var result = await _vendorService.GetEventsByVendorEmail(new GetUserRequest { Email = username}, newEvents);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddVendorRequest request)
        {
            var result = await _vendorService.AddVendorAsync(request);
            return Ok(result);
        }

        [HttpPost("event")]
        public async Task<IActionResult> Post(AssignVendorRequest request)
        {
            var result = await _vendorService.AssignAsync(request);
            return Ok(result);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Put(Guid id, EditVendorRequest request)
        {
            request.Id = id;
            var result = await _vendorService.EditVendorAsync(request);

            return Ok(result);
        }

        [HttpPut("eventVendor")]
        public async Task<IActionResult> Put(EditVendorEvent request)
        {
            var result = await _vendorService.EditVendorEventAsync(request);
            return Ok(result);
        }


    }
}
