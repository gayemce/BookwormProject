using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Register(RegisterDto request)
    {
        User user = new()
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Password = request.Password,
            UserName = request.UserName,
        };

        _context.Add(user);
        _context.SaveChanges();

        return Ok(new { Message = "Kayıt işlemi başarıyla tamamlandı" });
    }

    [HttpPost]
    public IActionResult Login(LoginDto request) 
    {
        User user = _context.Users.Where(p => p.Email == request.UserNameOrEmail || p.UserName == request.UserNameOrEmail).FirstOrDefault();

        if(user is null)
        {
            return BadRequest(new { Message = "Kullanıcı bulunamadı!" });
        }

        if(user.Password != request.Password)
        {
            return BadRequest(new { Message = "Şifre yanlış!" });
        }

        string token = JwtService.CreateToken(user);
        return Ok(new LoginResponseDto(Token: token, UserId: user.Id, UserName: user.GetName()));
    }
}
