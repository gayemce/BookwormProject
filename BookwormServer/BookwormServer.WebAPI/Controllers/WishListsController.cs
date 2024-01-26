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
    [HttpGet("{userId}")]
    public IActionResult GetAllWishList(int userId)
    {
        AppDbContext context = new();
        List<WishListResponseDto> wishLists = context.WishLists.Where(p => p.AppUserId == userId).AsNoTracking().Include(p => p.Book).Select(s => new WishListResponseDto()
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
        AppDbContext context = new();
        WishList wishList = new()
        {
            BookId = request.BookId,
            AppUserId = request.AppUserId,    
            
        };
        context.Add(wishList);
        context.SaveChanges();

        return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult removeFromWishListById(int id)
    {
        AppDbContext context = new();
        var wishList = context.WishLists.Where(p => p.Id == id).FirstOrDefault();
        if (wishList is not null)
        {
            context.WishLists.Remove(wishList);
            context.SaveChanges();
        }

        return NoContent();
    }
}
