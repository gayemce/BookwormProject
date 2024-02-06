using BookwormServer.WebAPI.Dtos;
using FluentValidation;

namespace BookwormServer.WebAPI.Validators;

public class BillingAddressUpdateValidator : AbstractValidator<UpdateAddressDto>
{
    public BillingAddressUpdateValidator()
    {
        RuleFor(p => p.ContactName).NotEmpty().WithMessage("Billing address contactName gönderilmesi zorunludur");
        RuleFor(p => p.Country).NotEmpty().WithMessage("BillingAddressCountry gönderilmesi zorunludur");
        RuleFor(p => p.City).NotEmpty().WithMessage("Billing address city gönderilmesi zorunludur");
        RuleFor(p => p.Description).NotEmpty().WithMessage("Billing address gönderilmesi zorunludur");
    }
}
