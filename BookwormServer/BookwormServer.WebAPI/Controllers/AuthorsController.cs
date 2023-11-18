using BookwormServer.WebAPI.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
	public IActionResult CreateAuthor(string Name, string LastName)
	{
		var author = _context.Authors.Where(p => p.Name == Name && p.Lastname == LastName).FirstOrDefault();
		if(author is not null)
		{
			return BadRequest(new { Message = "Yazar mevcut kayıtlarda zaten var." });
		}

		author = new()
		{
			Name = Name,
			Lastname = LastName
		};

		_context.Authors.Add(author);
		_context.SaveChanges();
		return NoContent();
	}

	[HttpGet]
	public IActionResult GetAllAuthors()
	{
		var authors = _context.Authors.ToList();
		return Ok(authors);
	}
}
