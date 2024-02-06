using BookwormServer.WebAPI.Dtos;
using FluentValidation;

namespace BookwormServer.WebAPI.Validators;

public class ShippinAddressAddValidator : AbstractValidator<AddAddressDto>
{
    public ShippinAddressAddValidator()
    {
        RuleFor(p => p.ContactName).NotEmpty().WithMessage("Shipping address contactName gönderilmesi zorunludur");
        RuleFor(p => p.Country).NotEmpty().WithMessage("ShippingAddressCountry gönderilmesi zorunludur");
        RuleFor(p => p.City).NotEmpty().WithMessage("Shipping address city gönderilmesi zorunludur");
        RuleFor(p => p.Description).NotEmpty().WithMessage("Shipping address gönderilmesi zorunludur");
    }
}
