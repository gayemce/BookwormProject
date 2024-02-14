using Azure;
using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.ValueObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class HomeController : ControllerBase
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
            .Include(a => a.Author)
            .OrderByDescending(p => p.CreatedAt)
            .Take(6)
            .ToList();

        List<BookDto> books = response
            .Select(item => new BookDto
            {
                Id = item.Id,
                Author = new AuthorDto
                {
                    Id = item.Author.Id,
                    Name = item.Author.Name,
                    Lastname = item.Author.Lastname,
                },
                Title = item.Title,
                DescriptionEn = item.DescriptionEn,
                DescriptionTr = item.DescriptionTr,
                Publisher = item.Publisher,
                Price = item.Price,
                ImgUrl = item.ImgUrl,
                Quantity = item.Quantity,
                IsFeatured = item.IsFeatured,
                CreatedAt = item.CreatedAt,
            })
            .ToList();

        return Ok(books);
    }

    [HttpGet]
    public IActionResult GetEnglishBooks()
    {
        var response = _context.Books
            .Include(b => b.BookLanguage)
            .Include(a => a.Author)
            .Where(p => p.BookLanguage!.Id == 1)
            .ToList();

        List<BookDto> books = response
            .Select(item => new BookDto
            {
                Author = new AuthorDto
                {
                    Id = item.Author!.Id,
                    Name = item.Author.Name,
                    Lastname = item.Author.Lastname,
                }
            })
            .ToList();

        List<BookDto> enBook = response
           .Select(item => new BookDto
           {
               BookLanguage = new BookLanguageDto
               {
                   Id = item.BookLanguage!.Id,
                   NameEn = item.BookLanguage.NameEn,
                   NameTr = item.BookLanguage.NameTr,
               }
           })
           .ToList();

        return Ok(response);
    }

    [HttpGet]
    public IActionResult GetScienceFictionBooks()
    {
        //Kategori ID'si 3 olan kitapları getir
        var categoryId = 2; 

        List<Book> books = _context.Books
            .Include(a => a.Author)
            .Include(c => c.BookCategories)
                .ThenInclude(c => c.Category)
            .Where(p => p.IsActive == true && p.IsDeleted == false &&
                        p.BookCategories!.Any(bc => bc.CategoryId == categoryId))
            .Take(3)
            .ToList();

        var BookDtos = books.Select(book => new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = new AuthorDto
            {
                Id = book.Author.Id,
                Name = book.Author.Name,
                Lastname = book.Author.Lastname
            },
            DescriptionEn = book.DescriptionEn,
            DescriptionTr = book.DescriptionTr,
            Publisher = book.Publisher,
            Price = new Money(book.Price.Value, book.Price.Currency),
            ImgUrl = book.ImgUrl,
            Quantity = book.Quantity,
            IsFeatured = book.IsFeatured,
            CreatedAt = book.CreatedAt,

            //Kitaba ait kategori isimlerini getir.
            BookCategories = book.BookCategories.Select(bc => new BookCategoryDto
            {
                CategoryId = bc.CategoryId,
                CategoryName = bc.Category.NameTr
            }).ToList()
        }).ToList();

        return Ok(BookDtos);
    }
  
}
