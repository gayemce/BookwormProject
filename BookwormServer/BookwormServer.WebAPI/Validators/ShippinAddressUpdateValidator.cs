using BookwormServer.WebAPI.Dtos;
using FluentValidation;

namespace BookwormServer.WebAPI.Validators;

public class ShippinAddressUpdateValidator : AbstractValidator<UpdateAddressDto>
{
    public ShippinAddressUpdateValidator()
    {
        RuleFor(p => p.ContactName).NotEmpty().WithMessage("Shipping address contactName gönderilmesi zorunludur");
        RuleFor(p => p.Country).NotEmpty().WithMessage("ShippingAddressCountry gönderilmesi zorunludur");
        RuleFor(p => p.City).NotEmpty().WithMessage("Shipping address city gönderilmesi zorunludur");
        RuleFor(p => p.Description).NotEmpty().WithMessage("Shipping address gönderilmesi zorunludur");
    }
}
