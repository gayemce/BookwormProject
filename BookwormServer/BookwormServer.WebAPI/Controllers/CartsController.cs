using BookwormServer.WebAPI.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class CartsController : ControllerBase
{
    [HttpPost]
    public IActionResult Payment(PaymentDto request)
    {
        return NoContent();
    }
}
