using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Azure.Core.HttpHeader;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public sealed class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateCategory(CreateCategoryDto request)
    {
        Category category = _context.Categories
            .Where(p => p.NameEn == request.NameEn || p.NameTr == request.NameTr)
            .FirstOrDefault();

        if(category is not null)
        {
            return BadRequest(new { Message = "Bu kategori zaten mevcut" });
        }

        category = new();
        category.NameEn = request.NameEn;
        category.NameTr = request.NameTr;
        category.IconImgUrl = request.IconImgUrl;
        category.IsActive = true;
        category.IsDeleted = false;

        _context.Categories.Add(category);
        _context.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    public IActionResult UpdateCategory(UpdateCategoryDto request)
    {
        var category = _context.Categories.Find(request.Id);
        if(category is null)
        {
            return BadRequest(new { Message = "Kayıt bulunamadı!" });
        }

        category.NameEn = request.NameEn;
        category.NameTr = request.NameTr;
        category.IconImgUrl = request.IconImgUrl;
        category.IsActive = true;
        category.IsDeleted = false;

        _context.SaveChanges();
        return NoContent();

    }

    [HttpGet("{id}")]
    public IActionResult RemoveCategoryById(int id)
    {
        var category = _context.Categories.Find(id);
        if(category is null)
        {
            return BadRequest(new { Message = "Kayıt Bulanamdı!" });
        }

        category.IsDeleted = true;
        _context.SaveChanges();
        return NoContent();

    }

    [HttpGet]
    public IActionResult GetAllCategories()
    {
        var categories = _context.Categories
            .Where(p => p.IsActive == true && p.IsDeleted == false)
            .OrderBy(p => p.NameTr)
            .ToList();

        return Ok(categories);
    }
}
