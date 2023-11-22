using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class AuthorsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthorsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateAuthor(AuthorDto request)
    {
        var author = _context.Authors.Where(p => p.Name == request.Name && p.Lastname == request.Lastname).FirstOrDefault();
        if (author is not null)
        {
            return BadRequest(new { Message = "Yazar mevcut kayıtlarda zaten var." });
        }

        author = new()
        {
            Name = request.Name,
            Lastname = request.Lastname
        };

        _context.Authors.Add(author);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    public IActionResult GetAllAuthors(RequestDto request)
    {
        var authors = _context.Authors
            .Where(a => a.isActive == true)
            .Where(a => a.Name.ToLower().Contains(request.Search.ToLower()) || a.Lastname.ToLower().Contains(request.Search.ToLower()))
            .OrderBy(a => a.Name)
            .Take(5)
            .ToList();

        return Ok(authors);
    }

    [HttpPost]
    public IActionResult GetBooksByAuthorId(RequestDto request)
    {
        List<Book> books = new();
        if (request.AuthorId == null) //Yazar seçilmediyse tüm kitapları getir
        {
            books = _context.Books
                .Where(p => p.IsActive == true && p.IsDeleted == false)
                .OrderBy(p => p.CreatedAt)
                .Take(request.PageSize)
                .ToList();
        }
        else
        {
            books = _context.Books
               .Include(a => a.Author)
               .Where(p => p.AuthorId == request.AuthorId)
               .Where(p => p.IsActive == true && p.IsDeleted == false)
               .Take(request.PageSize)
               .ToList();
        }

        List<BookDto> requestDto = new();
        foreach (var book in books)
        {
            var bookDto = new BookDto()
            {
                Id = book.Id,
                Title = book.Title,
                Author = _context.Authors
                .Where(a => a.Id == book.AuthorId)
                .Select(s => new AuthorDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Lastname = s.Lastname,
                    AboutEn = s.AboutEn,
                    AboutTr = s.AboutTr,
                    ProfileImgUrl = s.ProfileImgUrl,
                    PublishedBooksCount = s.PublishedBooksCount
                })
                .FirstOrDefault(),
                DescriptionEn = book.DescriptionEn,
                DescriptionTr = book.DescriptionTr,
                Publisher = book.Publisher,
                Price = book.Price,
                ImgUrl = book.ImgUrl,
                Quantity = book.Quantity,
                CreatedAt = book.CreatedAt,
                BookCategories = _context.BookCategories
                    .Where(p => p.BookId == book.Id)
                     .Select(s => new BookCategoryDto
                     {
                         CategoryId = s.CategoryId,
                         CategoryName = s.Category.NameTr
                     })
                     .ToList(),
            };

            requestDto.Add(bookDto);
        }

        return Ok(requestDto);
    }
}
