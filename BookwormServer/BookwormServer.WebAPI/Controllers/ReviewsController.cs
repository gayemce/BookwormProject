using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class ReviewsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReviewsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{bookId}")]
    public IActionResult GetAllReviews(int bookId)
    {
        List<ReviewDto> reviews =
            _context.Reviews
            .Where(p => p.BookId == bookId)
            .Include(p => p.Book)
            .Include(p => p.AppUser)
            .Select(s => new ReviewDto()
            {
                Id = s.Id,
                BookId = s.BookId,
                Book = s.Book,
                AppUserId = s.AppUserId,
                AppUser = s.AppUser,
                TitleEn = s.TitleEn,
                TitleTr = s.TitleTr,
                CommentEn = s.CommentEn,
                CommentTr = s.CommentTr,
                Raiting = s.Raiting,
                CreatedAt = s.CreatedAt
            })
            .OrderByDescending(p => p.CreatedAt)
            .ToList();

        return Ok(reviews);
    }
}
