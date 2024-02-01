using Azure.Core;
using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.ValueObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections.Immutable;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class BooksController : ControllerBase
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

            Book? book = _context.Books.Where(p => p.Title == request.Title).FirstOrDefault();
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
                IsFeatured = request.IsFeatured,
                BookLanguageId = request.BookLanguageId,
            };

            _context.Books.Add(book);
            _context.SaveChanges();

            // Kategori ekleme
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
        book.BookLanguageId = request.BookLanguageId;

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

    [HttpGet("{id}")]
    public IActionResult GetBookDetailById(int id)
    {
        var book = _context.Books
            .Include(a => a.Author)
            .Include(bd => bd.BookDetail)
            .Include(bl => bl.BookLanguage)
            .FirstOrDefault(b => b.Id == id);

        if (book == null)
        {
            return NotFound();
        }

        var bookDto = new BookDto
        {
            Id = book.Id,
            Title = book.Title,
            Author = new AuthorDto
            {
                Id = book.Author!.Id,
                Name = book.Author.Name,
                Lastname = book.Author.Lastname,
                AboutEn = book.Author.AboutEn,
                AboutTr = book.Author.AboutTr,
            },
            BookLanguage = new BookLanguageDto
            {
                Id = book.BookLanguage!.Id,
                NameEn = book.BookLanguage.NameEn,
                NameTr = book.BookLanguage.NameTr,
            },
            BookDetail = new BookDetailDto
            {
                Id = book.BookDetail!.Id,
                BookId = book.Id,
                Page = book.BookDetail.Page,
                ISBN = book.BookDetail.ISBN,
                PublicationDate = book.BookDetail.PublicationDate,
                PublicationCityCountryEn = book.BookDetail.PublicationCityCountryEn,
                PublicationCityCountryTr = book.BookDetail.PublicationCityCountryTr
            },
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

        return Ok(bookDto);
    }

    [HttpPost]
    public IActionResult GetAllBooks(RequestDto request)
    {
        ResponseDto<List<BookDto>> response = new();
        string replaceSearch = request.Search?.ToLower() ?? "";

        IQueryable<Book> query = _context.Books
            .Include(b => b.Author)
            .Include(bd => bd.BookDetail)
            .Include(bl => bl.BookLanguage)
            .Where(p => p.IsActive == true && p.IsDeleted == false);

        if (request.CategoryId is not null)
        {
            query = query
           .Include(b => b.BookCategories)
           .Where(b => b.BookCategories!.Any(bc => bc.CategoryId == request.CategoryId));
        }

        if (request.AuthorId is not null)
        {
            query = query.Where(b => b.AuthorId == request.AuthorId);
        }

        if (request.LanguageId is not null)
        {
            query = query.Where(b => b.BookLanguageId == request.LanguageId);
        }

        if (!string.IsNullOrEmpty(request.OrderBy))
        {
            switch (request.OrderBy.ToLower())
            {
                //case "popularity":
                //    query = query.OrderBy(b => b.Popularity);
                //    break;
                case "date":
                    query = query.OrderByDescending(b => b.CreatedAt);
                    break;
                case "price":
                    query = query.OrderBy(b => b.Price.Value);
                    break;
                case "price-desc":
                    query = query.OrderByDescending(b => b.Price.Value);
                    break;
                default:
                    query = query.OrderBy(b => b.Id);
                    break;
            }
        }

        query = query
            .Where(p => p.Title.ToLower().Contains(replaceSearch) ||
                        p.Author!.Name.ToLower().Contains(replaceSearch) ||
                        p.Author.Lastname.ToLower().Contains(replaceSearch));

        List<BookDto> booksDto = query
            .AsNoTracking()
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(book => new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = new AuthorDto
                {
                    Id = book.Author!.Id,
                    Name = book.Author.Name,
                    Lastname = book.Author.Lastname,
                    AboutEn = book.Author.AboutEn,
                    AboutTr = book.Author.AboutTr,
                },
                BookLanguage = new BookLanguageDto
                {
                    Id = book.BookLanguage!.Id,
                    NameEn = book.BookLanguage.NameEn,
                    NameTr = book.BookLanguage.NameTr
                },
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
            })
            .ToList();

        response.Data = booksDto;
        response.PageNumber = request.PageNumber;
        response.PageSize = request.PageSize;
        response.OrderBy = request.OrderBy;
        response.TotalPageCount = (int)Math.Ceiling(query.Count() / (double)request.PageSize);
        response.IsFirstPage = request.PageNumber == 1;
        response.IsLastPage = request.PageNumber == response.TotalPageCount;

        return Ok(response);
    }

}
