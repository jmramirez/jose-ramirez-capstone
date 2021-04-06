using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PartyAgile.Domain.Requests.VendorTask;
using PartyAgile.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PartyAgile.API.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class VendorTaskController : ControllerBase
    {
        private readonly IVendorTaskService _vendorTaskService;

        public VendorTaskController(IVendorTaskService vendorTaskService)
        {
            _vendorTaskService = vendorTaskService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _vendorTaskService.GetVendorTasksAsync();
            return Ok(result);
        }


        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _vendorTaskService.GetVendorTaskAsync(new GetVendorTaskRequest { Id = id });
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AddVendorTaskRequest request)
        {
            var result = await _vendorTaskService.AddVendorTaskAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, null);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Put(Guid id, EditVendorTaskRequest request)
        {
            request.Id = id;
            var result = await _vendorTaskService.EditVendorTaskAsync(request);
            return Ok(result);
        }

    }
}
