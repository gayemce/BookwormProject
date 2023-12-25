using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.Services;
using BookwormServer.WebAPI.Validators;
using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly JwtService _jwtService;

    public AuthController(AppDbContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, JwtService jwtService)
    {
        _context = context;
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginDto request, CancellationToken cancellationToken)
    {
        LoginValidator validator = new();
        ValidationResult validationResult = validator.Validate(request);

        if (!validationResult.IsValid)
        {
            return StatusCode(422, validationResult.Errors.Select(s => s.ErrorMessage));
        }

        AppUser? appUser = await _userManager.FindByNameAsync(request.UserNameOrEmail);
        if (appUser is null)
        {
            appUser = await _userManager.FindByEmailAsync(request.UserNameOrEmail);
            if(appUser is null)
            {
                return BadRequest(new { Message = "Kullanıcı bulanmadı! " });
            }
        }

        var result = await _signInManager.CheckPasswordSignInAsync(appUser, request.Password, true);

        if (result.IsLockedOut)
        {
            TimeSpan? timeSpan = appUser.LockoutEnd - DateTime.UtcNow;
            if(timeSpan is not null)
                return BadRequest(new { Message = $"Kullanıcınız 3 kere yanlış şifre girişinden dolayı {Math.Ceiling(timeSpan.Value.TotalMinutes)} dakika kitlenmiştir." });
        }

        if (result.IsNotAllowed)
        {
            return BadRequest(new { Message = "Mail adresiniz onaylı değil!" });
        }

        if (!result.Succeeded)
        {
            return BadRequest(new { Message = "Şifreniz yanlış!" });
        }

        string token = _jwtService.CreateToken(appUser, null ,request.RemeberMe);
        return Ok(new { AccessToken = token });
    }

    [HttpPost]
    public async Task<IActionResult> Register(RegisterDto request, CancellationToken cancellationToken)
    {
        //Aynı kullanıcıdan birden fazla kayıda izin veriyor
        AppUser? appUser = await _userManager.FindByNameAsync(request.UserName);
        if (appUser is null)
        {
            appUser = await _userManager.FindByEmailAsync(request.Email);
            if (appUser is null)
            {
                appUser = new()
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    UserName = request.UserName,
                    PasswordHash = request.Password,
                    PasswordConfirmed = request.ConfirmedPassword
                };

                if (request.Password != request.ConfirmedPassword)
                {
                    return BadRequest(new { Message = "Başarısız Kayıt işlemi. Şifreler uyuşmuyor!" });
                }

                _context.Add(appUser);
                _context.SaveChanges();

                return Ok(new { Message = "Kayıt işlemi başarıyla tamamlandı" });
            }
        }

        return BadRequest(new { Message = "Bu kullanıcı kayıdı zaten mevcut"});

    }
}

