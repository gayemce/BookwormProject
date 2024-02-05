using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{userId}")]
    public IActionResult GetAll(int UserId, DateTime paymentDate)
    {
        List<Order> orders = _context.Orders.Where(p => p.AppUserId == UserId).ToList();
        return Ok(orders);
    }
}
