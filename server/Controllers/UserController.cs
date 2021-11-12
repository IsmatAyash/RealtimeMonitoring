using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RealtimeMonitoring.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        // GET api/user
        [HttpGet]
        public IActionResult GetUser()
        {
            var domainUser = HttpContext.User.Identity.Name;
            if (domainUser == null)
            {
                return NoContent();
            }
            var winUser = domainUser.Substring(domainUser.IndexOf(@"\") + 1);
            return Ok(winUser);
        }
    }
}