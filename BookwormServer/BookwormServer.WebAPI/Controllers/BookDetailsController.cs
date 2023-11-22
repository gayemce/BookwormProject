using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;

public class BookDetailsController
{
    private readonly AppDbContext _context;

    public BookDetailsController(AppDbContext context)
    {
        _context = context;
    }

    //[HttpPost]
    //public IActionResult CreateDetailBook(CreateDetailBookDto request)
    //{
    //    BookDetail bookDetail = _context.BookDetails;
    //}
}
