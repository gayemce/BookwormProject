using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.ValueObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class BooksController : ControllerBase
{
    //Mapper kütüphanesi eklenecek.
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
                AuthorId = request.AuthorId,
                BookDetailId = request.BookDetailId,
                DescriptionEn = request.DescriptionEn,
                DescriptionTr = request.DescriptionTr,
                Publisher = request.Publisher,
                Price = new Money(request.Price.Value, request.Price.Currency),
                ImgUrl = request.ImgUrl,
                Quantity = request.Quantity,
                IsFeatured = request.IsFeatured
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
        book.AuthorId = request.AuthorId;
        book.BookDetailId = request.BookDetailId;
        book.DescriptionEn = request.DescriptionEn;
        book.DescriptionTr = request.DescriptionTr;
        book.Publisher = request.Publisher;
        book.Price = new Money(request.Price.Value, request.Price.Currency);
        book.ImgUrl = request.ImgUrl;
        book.Quantity = request.Quantity;
        book.IsFeatured = request.IsFeatured;

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

    [HttpPost]
    public IActionResult GetAllBooks(RequestDto request)
    {
        ResponseDto<List<Book>> response = new();
        string replaceSearch = request.Search.Replace("İ", "i").ToLower();
        var newBooks = new List<Book>();

        if(request.CategoryId != null)
        {
            newBooks = _context.BookCategories
                .Where(p => p.CategoryId == request.CategoryId)
                .Select(s => s.Book)
                .ToList();
        }
        else
        {
            newBooks = _context.Books.ToList();
        }

        newBooks = newBooks
            .Where(p => p.Title.ToLower().Contains(replaceSearch) ||
                        p.Author.Name.ToLower().Contains(replaceSearch) ||
                        p.Author.Lastname.ToLower().Contains(replaceSearch))
            .ToList();

        response.Data = newBooks
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToList();
        response.PageNumber = request.PageNumber;
        response.PageSize = request.PageSize;
        response.TotalPageCount = (int)Math.Ceiling(newBooks.Count / (double)request.PageSize);
        response.IsFirstPage = request.PageNumber == 1;
        response.IsLastPage = request.PageNumber == response.TotalPageCount;

        return Ok(response);
    }

    [HttpPost]
    public IActionResult GetBooksByCategoryId(RequestDto request)
    {
        List<Book> books = new();
        if (request.CategoryId == null) //Tüm kitapları getir.
        {
            books = _context.Books
                .Where(p => p.IsActive == true && p.IsDeleted == false)
                .OrderBy(p => p.CreatedAt)
                .Where(p => p.Title.ToLower().Contains(request.Search.ToLower()))
                .Take(request.PageSize)
                .ToList();
        }
        else //CategoryId göre seçilen kitapları getir.
        {
            books = _context.BookCategories
                .Where(p => p.CategoryId == request.CategoryId)
                .Include(b => b.Book)
                .Select(s => s.Book)
                .Where(p => p.IsActive == true && p.IsDeleted == false)
                .Where(p => p.Title.ToLower().Contains(request.Search.ToLower()))
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

    [HttpPost]
    public IActionResult getBooksByLanguageId(RequestDto request)
    {
        List<Book> books = new();
        if(request.LanguageId == null)
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
                .Include(bd => bd.BookDetail)
                .Where(bd => bd.BookDetail.LanguageId == request.LanguageId)
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
                })
                .FirstOrDefault(),
                DescriptionEn = book.DescriptionEn,
                DescriptionTr = book.DescriptionTr,
                Publisher = book.Publisher,
                Price = book.Price,
                ImgUrl = book.ImgUrl,
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
