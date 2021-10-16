using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PartyAgile.Domain.Requests.User;
using PartyAgile.Domain.Services;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PartyAgile.API.Controllers
{
    [Authorize]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var claim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);

            if (claim == null) return Unauthorized();

            var token = await _userService.GetUserAsync(new GetUserRequest { Email = claim.Value });
            return Ok(token);
        }

        [HttpGet("events/{newEvents}")]
        public async Task<IActionResult> GetEventsById(string newEvents)
        {
            var time = newEvents;
            var username = HttpContext.User.Identity.Name;
            var result = await _userService.GetEventsByUserId(new GetUserRequest { Email = username },newEvents);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("auth")]
        public async Task<IActionResult> SignIn(SignInRequest request)
        {
            var token = await _userService.SignInAsync(request);
            if (token == null) return BadRequest();
            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SignUp(SignUpRequest request)
        {
            var user = await _userService.GetUserAsync(new GetUserRequest { Email = request.Email });

            if (user != null)
                return BadRequest(new { message = "An user with that email address already exists!" });

            user = await _userService.SignUpAsync(request);
            if (user == null) return BadRequest();
            var token = await _userService.SignInAsync(new SignInRequest { Email = user.Email, Password = request.Password });
            return Ok(token);
        }
    }
}
