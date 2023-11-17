using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateBook(CreateBookDto request)
    {
        Book book = _context.Books.Where(p => p.Title == request.Title).FirstOrDefault();
        if (book is not null)
        {
            return BadRequest(new { Message = "Bu kitap zaten eklenmiş" });
        }

        book = new()
        {
            Title = request.Title,
            Author = request.Author,
            DescriptionEn = request.DescriptionEn,
            DescriptionTr = request.DescriptionTr,
            Publisher = request.Publisher,
            Price = request.Price,
            ImgUrl = request.ImgUrl,
            Quantity = request.Quantity,
            IsActive = true,
            IsDeleted = false
        };

        _context.Books.Add(book);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    public IActionResult UpdateBook(UpdateBookDto request)
    {
        var book = _context.Books.Find(request.Id);
        if (book is null)
        {
            return BadRequest(new { Message = "Kayıt bulunamadı!" });
        }

        book.Title = request.Title;
        book.Author = request.Author;
        book.DescriptionEn = request.DescriptionEn;
        book.DescriptionTr = request.DescriptionTr;
        book.Publisher = request.Publisher;
        book.Price = request.Price;
        book.ImgUrl = request.ImgUrl;
        book.Quantity = request.Quantity;
        book.IsActive = true;
        book.IsDeleted = false;


        _context.SaveChanges();
        return NoContent();

    }

    [HttpGet("{id}")]
    public IActionResult RemoveBookById(int id)
    {
        var book = _context.Books.Find(id);
        if(book is null)
        {
            return BadRequest(new { Message = "Kitap bulunamadı!" });
        }

        book.IsDeleted = true;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAllBooks()
    {
        var books = _context.Books
            .Where(p => p.IsActive == true && p.IsDeleted == false)
            .ToList();

        return Ok(books);
    }

    
}
