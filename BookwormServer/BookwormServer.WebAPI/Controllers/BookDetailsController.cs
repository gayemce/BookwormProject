using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class BookDetailsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookDetailsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateBookDetail(CreateBookDetailDto request)
    {
        BookDetail bookDetail = _context.BookDetails
            .Where(p => p.BookId == request.BookId)
            .FirstOrDefault();

        if (bookDetail is not null)
        {
            return BadRequest(new { Message = "Bu kitaba ait detaylı bilgi zaten bulunuyor" });
        }

        bookDetail = new();
        bookDetail.BookId = request.BookId;
        bookDetail.Page = request.Page;
        bookDetail.ISBN = request.ISBN;
        bookDetail.PublicationDate = request.PublicationDate;
        bookDetail.PublicationCityCountryEn = request.PublicationCityCountryEn;
        bookDetail.PublicationCityCountryTr = request.PublicationCityCountryTr;

        _context.BookDetails.Add(bookDetail);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    public IActionResult UpdateBookDetail(UpdateBookDetailsDto request)
    {
        var bookDetail = _context.BookDetails.Find(request.Id);
        if (bookDetail is null)
        {
            return BadRequest(new { Message = "Kayıt bulunamadı!" });
        }

        bookDetail.Page = request.Page;
        bookDetail.ISBN = request.ISBN;
        bookDetail.PublicationDate = request.PublicationDate;
        bookDetail.PublicationCityCountryEn = request.PublicationCityCountryEn;
        bookDetail.PublicationCityCountryTr = request.PublicationCityCountryTr;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult RemoveBookDetailById(int id)
    {
        var bookDetail = _context.BookDetails.Find(id);
        if (bookDetail is null)
        {
            return BadRequest(new { Message = "Kayıt bulunamadı." });
        }

        _context.BookDetails.Remove(bookDetail);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAllBookDetail()
    {
        var bookDetails = _context.BookDetails.ToList();
        return Ok(bookDetails);
    }


}
