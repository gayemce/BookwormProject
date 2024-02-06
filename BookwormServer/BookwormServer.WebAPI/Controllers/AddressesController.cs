using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Dtos;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.Validators;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace BookwormServer.WebAPI.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class AddressesController : ControllerBase
{
    private readonly AppDbContext _context;

    public AddressesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult Create(AddAddressDto request)
    {
        Address? address = _context.Addresses.Where(p => p.AppUserId == request.AppUserId).FirstOrDefault();
        if(address is not null)
        {
            return BadRequest(new { Message = "Kullanıcıya ait adres kaydı zaten var." });
        }

        ShippinAddressAddValidator informationValidator = new();
        ValidationResult validationResult = informationValidator.Validate(request);

        if (!validationResult.IsValid)
        {
            return StatusCode(422, validationResult.Errors.Select(s => s.ErrorMessage));
        }

        address = new()
        {
            AppUserId = request.AppUserId,
            Country = request.Country,
            City = request.City,
            ZipCode = request.ZipCode,
            ContactName = request.ContactName,
            Description = request.Description
        };

        _context.Addresses.Add(address);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpPost]
    public IActionResult Update(UpdateAddressDto request)
    {
        Address? address = _context.Addresses.Where(p => p.Id == request.Id).FirstOrDefault();
        if(address is null)
        {
            return BadRequest(new { Message = "Kayıt bulunamadı!" });
        }

        ShippinAddressUpdateValidator informationValidator = new();
        ValidationResult validationResult = informationValidator.Validate(request);

        if (!validationResult.IsValid)
        {
            return StatusCode(422, validationResult.Errors.Select(s => s.ErrorMessage));
        }

        address.AppUserId = request.AppUserId;
        address.Country = request.Country;
        address.City = request.City;
        address.ZipCode = request.ZipCode;
        address.ContactName = request.ContactName;
        address.Description = request.Description;

        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("{userId}")]
    public IActionResult Get(int userId) 
    {
        Address? address = _context.Addresses.Where(p => p.AppUserId == userId).FirstOrDefault();

        return Ok(address);
    }

    [HttpPost]
    public IActionResult billingAddressCreate(AddAddressDto request)
    {
        BillingAddress? billingAddress = _context.BillingAddresses.Where(p => p.AppUserId == request.AppUserId).FirstOrDefault();
        if (billingAddress is not null)
        {
            return BadRequest(new { Message = "Kullanıcıya ait adres kaydı zaten var." });
        }

        BillingAddressAddValidator informationValidator = new();
        ValidationResult validationResult = informationValidator.Validate(request);

        if (!validationResult.IsValid)
        {
            return StatusCode(422, validationResult.Errors.Select(s => s.ErrorMessage));
        }

        billingAddress = new()
        {
            AppUserId = request.AppUserId,
            Country = request.Country,
            City = request.City,
            ZipCode = request.ZipCode,
            ContactName = request.ContactName,
            Description = request.Description
        };

        _context.BillingAddresses.Add(billingAddress);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpPost]
    public IActionResult billingAddressUpdate(UpdateAddressDto request)
    {
        BillingAddress? billingAddress = _context.BillingAddresses.Where(p => p.Id == request.Id).FirstOrDefault();
        if (billingAddress is null)
        {
            return BadRequest(new { Message = "Kayıt bulunamadı!" });
        }

        BillingAddressUpdateValidator informationValidator = new();
        ValidationResult validationResult = informationValidator.Validate(request);

        if (!validationResult.IsValid)
        {
            return StatusCode(422, validationResult.Errors.Select(s => s.ErrorMessage));
        }

        billingAddress.AppUserId = request.AppUserId;
        billingAddress.Country = request.Country;
        billingAddress.City = request.City;
        billingAddress.ZipCode = request.ZipCode;
        billingAddress.ContactName = request.ContactName;
        billingAddress.Description = request.Description;

        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("{userId}")]
    public IActionResult billingAddresGet(int userId)
    {
        BillingAddress? billingAddress = _context.BillingAddresses.Where(p => p.AppUserId == userId).FirstOrDefault();

        return Ok(billingAddress);
    }
}
