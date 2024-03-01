using Azure.Core;
using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.Validators;
using BookwormServer.WebAPI.ValueObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class BookDiscountController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookDiscountController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Create(BookDiscountDto request)
    {
        BookDiscount? bookDiscount = _context.BookDiscounts
            .Where(p => p.BookId == request.BookId)
            .FirstOrDefault();

        if (bookDiscount is not null)
        {
            return BadRequest(new { Message = "Bu kitap için zaten indirim yapılmış!" });

        }

        Money? bookPrice = _context.Books
        .Where(b => b.Id == request.BookId).AsNoTracking()
        .Select(b => b.Price)
        .FirstOrDefault();

        decimal discountedPrice = request.DiscountPercentage == 0 ? bookPrice!.Value : bookPrice!.Value - (bookPrice.Value * request.DiscountPercentage / 100);

        bookDiscount = new()
        {
            BookId = request.BookId,
            DiscountPercentage = request.DiscountPercentage,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            DiscountedPrice = discountedPrice
        };

        _context.BookDiscounts.Add(bookDiscount);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("{bookId}")]
    public IActionResult Get(int bookId) 
    {
        BookDiscount? bookDiscount = 
            _context.BookDiscounts
            .Where(p => p.BookId == bookId)
            .FirstOrDefault();

        return Ok(bookDiscount);
    }
}
