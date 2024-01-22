using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class BookLanguagesController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookLanguagesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateLanguage(CreateLanguageDto request)
    {
        BookLanguage bookLanguage = _context.BookLanguages
            .Where(p => p.NameEn == request.NameEn || p.NameTr == request.NameTr)
            .FirstOrDefault();

        if (bookLanguage is not null)
        {
            return BadRequest(new { Message = "Kayıt zaten mevcut" });
        }

        bookLanguage = new();
        bookLanguage.NameEn = request.NameEn;
        bookLanguage.NameTr = request.NameTr;

        _context.BookLanguages.Add(bookLanguage);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult RemoveById(int id)
    {
        var bookLanguage = _context.BookLanguages.Find(id);
        if (bookLanguage is null)
        {
            return BadRequest(new { Message = "Kayıt bulunamadı" });
        }

        _context.BookLanguages.Remove(bookLanguage);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAllLanguages()
    {
        var bookLanguages = _context.BookLanguages.ToList();
        return Ok(bookLanguages);
    }

}
