using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PartyAgile.Domain.Requests.Vendor;
using PartyAgile.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartyAgile.API.Controllers
{
    [Route("api/vendor")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _vendorService.GetVendorAsync(new GetVendorRequest { Id = id}  );
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddVendorRequest request)
        {
            var result = await _vendorService.AddVendorAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, null);
        }

        [HttpPut]
        public async Task<IActionResult> Put(Guid id, EditVendorRequest request)
        {
            request.Id = id;
            var result = await _vendorService.EditVendorAsync(request);

            return Ok(result);
        }
    }
}
