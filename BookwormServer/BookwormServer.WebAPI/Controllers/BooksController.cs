using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        using var transaction = _context.Database.BeginTransaction();

        try
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

            //Kategori ekleme
            if (request.CategoryIds is not null && request.CategoryIds.Any())
            {
                foreach (var categoryId in request.CategoryIds)
                {
                    var bookCategory = new BookCategory
                    {
                        BookId = book.Id,
                        CategoryId = categoryId
                    };

                    _context.BookCategories.Add(bookCategory);
                }

                _context.SaveChanges();
            }

            transaction.Commit();
            return NoContent();
        }

        catch (Exception)
        {
            transaction.Rollback();
            return StatusCode(500, "Bir hata oluştu");
        }
    }

    [HttpPost]
    public IActionResult UpdateBook(UpdateBookDto request)
    {
        var book = _context.Books.Include(b => b.BookCategories).FirstOrDefault(b => b.Id == request.Id);

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

        //Kategori güncelleme
        if (request.CategoryIds is not null)
        {
            //mevcut kategorileri kaldır
            foreach (var existingCategory in book.BookCategories.ToList())
            {
                _context.BookCategories.Remove(existingCategory);
            }

            //Yeni kategoriyi ekle
            foreach (var categoryId in request.CategoryIds)
            {
                var bookCategory = new BookCategory
                {
                    BookId = book.Id,
                    CategoryId = categoryId
                };

                _context.BookCategories.Add(bookCategory);
            }

            _context.SaveChanges();
        }

        _context.SaveChanges();
        return NoContent();

    }

    [HttpGet("{id}")]
    public IActionResult RemoveBookById(int id)
    {
        var book = _context.Books.Find(id);
        if (book is null)
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
            .Include(bc => bc.BookCategories)
            .ThenInclude(c => c.Category)
            .ToList();

        var bookDtos = books.Select(book => new BookDto
        {
            //Mapper kütüphanesi eklenecek.
            Id = book.Id,
            Title = book.Title,
            Author = book.Author,
            DescriptionEn = book.DescriptionEn,
            DescriptionTr = book.DescriptionTr,
            Publisher = book.Publisher,
            Price = book.Price,
            ImgUrl = book.ImgUrl,
            Quantity = book.Quantity,
            IsActive = true,
            IsDeleted = false,
            CreatedAt = book.CreatedAt,

            //Kitaba ait kategori isimlerini getir.
            BookCategories = book.BookCategories.Select(bc => new BookCategoryDto
            {
                CategoryId = bc.CategoryId,
                CategoryName = bc.Category.NameTr
            }).ToList()
        }).ToList();
    
        return Ok(bookDtos);
    }
}
