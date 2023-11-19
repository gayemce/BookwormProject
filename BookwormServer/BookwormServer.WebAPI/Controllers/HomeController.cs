using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class HomeController : ControllerBase
{
    private readonly AppDbContext _context;

    public HomeController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetNewArrivalBooks()
    {
        //Son 6 kitap-yazar bilgilerini getirir.
        var response = _context.Books
            .Include(b => b.Author)
            .OrderByDescending(p => p.CreatedAt)
            .Take(6)
            .ToList();

        List<BookDto> books = response
            .Where(item => item.Author != null)
            .Select(item => new BookDto
            {
                Id = item.Id,
                Author = item.Author != null ? new AuthorDto
                {
                    Id = item.Author.Id,
                    Name = item.Author.Name,
                    Lastname = item.Author.Lastname,
                } : new AuthorDto(),
                Title = item.Title,
                DescriptionEn = item.DescriptionEn,
                DescriptionTr = item.DescriptionTr,
                Publisher = item.Publisher,
                Price = item.Price,
                ImgUrl = item.ImgUrl,
                Quantity = item.Quantity,
                CreatedAt = item.CreatedAt,
            })
            .ToList();

        return Ok(books);

    }
}
