using Azure.Core;
using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class WishListsController : ControllerBase
{
    private readonly AppDbContext _context;

    public WishListsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{userId}")]
    public IActionResult GetAllWishList(int userId)
    {
        List<WishListResponseDto> wishLists = _context.WishLists.Where(p => p.AppUserId == userId).AsNoTracking().Include(p => p.Book).Select(s => new WishListResponseDto()
        {
            Author = s.Book!.Author,
            AuthorId = s.Book.AuthorId,
            CreatedAt = s.Book.CreatedAt,
            Id = s.Book.Id,
            IsActive = s.Book.IsActive,
            ImgUrl = s.Book.ImgUrl,
            IsDeleted = s.Book.IsDeleted,
            IsFeatured = s.Book.IsFeatured,
            BookDetail = s.Book.BookDetail,
            Title = s.Book.Title,
            Publisher = s.Book.Publisher,
            BookLanguage = s.Book.BookLanguage,
            BookCategories = s.Book.BookCategories,
            Price = s.Book.Price,
            WishListId = s.Id
        }).ToList();

        return Ok(wishLists);
    }

    [HttpPost]
    public IActionResult AddToWishList(AddToWishListDto request)
    {
        WishList? wishList = _context.WishLists.Where(p => p.BookId == request.BookId && p.AppUserId == request.AppUserId).FirstOrDefault();

        if(wishList is not null)
        {
            return StatusCode(422, new { message = "Bu kitap zaten favorilerde ekli!" });
        }
        else
        {
            wishList = new()
            {
                BookId = request.BookId,
                AppUserId = request.AppUserId,
                Price = request.Price
            };
            _context.Add(wishList);
        }
        
        _context.SaveChanges();
        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult removeFromWishListById(int id)
    {
        var wishList = _context.WishLists.Where(p => p.Id == id).FirstOrDefault();
        if (wishList is not null)
        {
            _context.WishLists.Remove(wishList);
            _context.SaveChanges();
        }

        return NoContent();
    }
}
