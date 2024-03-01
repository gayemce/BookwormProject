using Azure.Core;
using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.Validators;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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

    [HttpPost]
    public IActionResult Create(CreateReviewDto request)
    {
        Review? review = _context.Reviews.Where(p => p.AppUserId == request.AppUserId && p.BookId == request.BookId).FirstOrDefault();
        if (review is not null)
        {
            return BadRequest(new { Message = "Bu ürün için zaten yorumunuz var." });
        }

        ReviewCreateValidator validator = new();
        ValidationResult validationResult = validator.Validate(request);

        if (!validationResult.IsValid)
        {
            return StatusCode(422, validationResult.Errors.Select(s => s.ErrorMessage));
        }

        review = new()
        {
            BookId = request.BookId,
            AppUserId = request.AppUserId,
            Comment = request.Comment,
            Raiting = request.Raiting,
            Title = request.Title,
            CreatedAt = DateTime.Now,
        };

        _context.Reviews.Add(review);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("{bookId}/{appUserId}")]
    public IActionResult AllowToComment(int bookId, int appUserId) 
    {
        bool isAllow = false;

        var ordersWithDetails = _context.Orders
            .Include(o => o.OrderDetails)
            .Where(o => ((o.StatusTr == "Teslim Edildi" || o.StatusEn == "Delivered") && o.AppUserId == appUserId) && o.OrderDetails!.Any(od => od.BookId == bookId))
            .ToList();

        if (ordersWithDetails.Count == 1)
        {
            isAllow = true;
        }
        else
        {
            isAllow = false;
        }

        return Ok(isAllow);
    }

    [HttpGet("{bookId}")]
    public IActionResult GetAllReviews(int bookId)
    {
        List<ReviewDto> reviews =
            _context.Reviews
            .Where(p => p.BookId == bookId)
            .Include(p => p.Book)
            .Select(s => new ReviewDto()
            {
                Id = s.Id,
                BookId = s.BookId,
                Book = s.Book,
                AppUserId = s.AppUserId,
                AppUser = s.AppUser,
                Title = s.Title,
                Comment = s.Comment,
                Raiting = s.Raiting,
                CreatedAt = s.CreatedAt
            })
            .OrderByDescending(p => p.CreatedAt)
            .ToList();

        return Ok(reviews);
    }

    [HttpGet("{bookId}")]
    public IActionResult calculateStar(int bookId)
    {
        var reviews = _context.Reviews
            .Where(p => p.BookId == bookId)
            .Select(s => s.Raiting)
            .ToList();

        int star1 = 0; 
        int star2 = 0; 
        int star3 = 0; 
        int star4 = 0; 
        int star5 = 0;

        foreach (var rating in reviews)
        {
            if (rating == 1) star1++;
            if (rating == 2) star2++;
            if (rating == 3) star3++;
            if (rating == 4) star4++;
            if (rating == 5) star5++;
        }

        return Ok(new { star1, star2, star3, star4, star5});
    }


    [HttpGet("{bookId}")]
    public IActionResult calculateReviews(int bookId)
    {
        var reviews = _context.Reviews
            .Where(p => p.BookId == bookId)
            .Select(s => s.Raiting)
            .ToList();

        if (reviews.Count == 0)
        {
            return NotFound("Belirtilen kitap için yorum bulunamadı.");
        }

        double sum = 0;
        foreach (var rating in reviews)
        {
            sum += rating;
        }

        double averageRating = sum / reviews.Count;

        return Ok(averageRating);
    }

}
