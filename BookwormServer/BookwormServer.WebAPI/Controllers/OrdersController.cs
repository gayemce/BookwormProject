using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Models;
using Iyzipay.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public IActionResult GetAllOrdersByUserId(int userId)
    {
        var orders = _context.Orders.Where(o => o.AppUserId == userId)
            .Include(o => o.OrderDetails!)
                .ThenInclude(b => b.Book)
                    .ThenInclude(a => a.Author)
            .ToList();

        if (orders == null || orders.Count == 0)
        {
            return BadRequest("Kullanıcıya ait herhangi bir sipariş bulunamadı.");
        }

        var orderResponse = orders.Select(o => new
        {
            Id = o.Id,
            OrderNumber = o.OrderNumber,
            CreatedAt = o.CreatedAt,
            ProductQuantity = o.ProductQuantity,
            StatusEn = o.StatusEn,
            StatusTr = o.StatusTr,
            PaymentCurrency = o.PaymentCurrency
        });

        return Ok(orderResponse);
    }

    [HttpGet("{userId}")]
    public IActionResult OrderReceivedByUserId(int userId)
    {
        var order = _context.Orders
            .Where(o => o.AppUserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .Include(o => o.OrderDetails!)
                .ThenInclude(b => b.Book)
                    .ThenInclude(a => a.Author)
            .FirstOrDefault();

        if (order == null)
        {
            return BadRequest("Kullanıcıya ait herhangi bir sipariş bulunamadı.");
        }

        var orderResponse = new
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            ProductQuantity = order.ProductQuantity,
            CreatedAt = order.CreatedAt,
            PaymentMethodTr = order.PaymentMethodTr,
            PaymentMethodEn = order.PaymentMethodEn,
            StatusEn = order.StatusEn,
            StatusTr = order.StatusTr,
            PaymentCurrency = order.PaymentCurrency,
            Books = order.OrderDetails!.Select(OrderDetail => new
            {
                BookId = OrderDetail.BookId,
                Title = OrderDetail.Book!.Title,
                Name = OrderDetail.Book!.Author!.Name,
                Lastname = OrderDetail.Book!.Author.Lastname,
                Publisher = OrderDetail.Book!.Publisher,
                Quantity = OrderDetail.Quantity,
                Price = OrderDetail.Price.Value,
                Currency = OrderDetail.Price.Currency
            })
        };

        return Ok(orderResponse);
    }

    [HttpGet("{userId}/{orderId}")]
    public IActionResult GetAllOrdersDetailByUserId(int userId, int orderId)
    {
        var order = _context.Orders
            .Where(o => o.AppUserId == userId && o.Id == orderId)
            .Include(o => o.OrderDetails!)
                .ThenInclude(b => b.Book)
                    .ThenInclude(a => a.Author)
            .ToList();

        if (order == null || order.Count == 0)
        {
            return BadRequest("Kullanıcıya ait herhangi bir sipariş bulunamadı.");
        }

        var orderResponse = order.Select(order => new
        {
            Id = order.Id,
            OrderNumber = order.OrderNumber,
            ProductQuantity = order.ProductQuantity,
            CreatedAt = order.CreatedAt,
            PaymentMethodTr = order.PaymentMethodTr,
            PaymentMethodEn = order.PaymentMethodEn,
            StatusEn = order.StatusEn,
            StatusTr = order.StatusTr,
            PaymentCurrency = order.PaymentCurrency,
            Books = order.OrderDetails!.Select(OrderDetail => new
            {
                BookId = OrderDetail.BookId,
                Title = OrderDetail.Book!.Title,
                Name = OrderDetail.Book!.Author!.Name,
                Lastname = OrderDetail.Book!.Author.Lastname,
                Publisher = OrderDetail.Book!.Publisher,
                Quantity = OrderDetail.Quantity,
                Price = OrderDetail.Price.Value,
                Currency = OrderDetail.Price.Currency
            })
        });

        return Ok(orderResponse);
    }

}
