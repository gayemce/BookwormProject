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
}
