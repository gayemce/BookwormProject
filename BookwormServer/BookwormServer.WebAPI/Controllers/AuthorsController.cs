using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class AuthorsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthorsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateAuthor(CreateAuthorDto request)
    {
        var author = _context.Authors.Where(p => p.Name == request.Name && p.Lastname == request.Lastname).FirstOrDefault();
        if (author is not null)
        {
            return BadRequest(new { Message = "Yazar mevcut kayıtlarda zaten var." });
        }

        author = new()
        {
            Name = request.Name,
            Lastname = request.Lastname,
            AboutEn = request.AboutEn,
            AboutTr = request.AboutTr,
            isActive = request.isActive,
            ProfileImgUrl = request.ProfileImgUrl
        };
        
        _context.Authors.Add(author);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    public IActionResult UpdateAuthor(UpdateAuthorDto request)
    {
        var author = _context.Authors.Find(request.Id);
        if (author is null)
        {
            return BadRequest(new { Message = "Kayıt Bulunamadı!" });
        }

        author.Name = request.Name;
        author.Lastname = request.Lastname;
        author.AboutEn = request.AboutEn;
        author.AboutTr = request.AboutTr;
        author.isActive = request.isActive;
        author.ProfileImgUrl = request.ProfileImgUrl;
        
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult RemoveAuthorById(int id)
    {
        var author = _context.Authors.Find(id);
        if(author is null)
        {
            return BadRequest(new { Message = "Kayıt Bulunamdı" });
        }

        author.isActive = false;
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet]
    public IActionResult GetAuthors()
    {
        var authors = _context.Authors.ToList();
        return Ok(authors);
    }

    [HttpPost]
    public IActionResult GetAllAuthors(RequestDto request)
    {
        var authors = _context.Authors
            .Where(a => a.isActive == true)
            .Where(a => a.Name.ToLower().Contains(request.Search.ToLower()) || 
                a.Lastname.ToLower().Contains(request.Search.ToLower()))
            .OrderBy(a => a.Id)
            .ToList();

        return Ok(authors);
    }
}
