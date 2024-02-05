using BookwormServer.WebAPI.Dtos;
using FluentValidation;

namespace BookwormServer.WebAPI.Validators;

public class UpdateUserInformationValidator : AbstractValidator<UpdateUserInformationDto>
{
    public UpdateUserInformationValidator()
    {
        RuleFor(p => p.FirstName).NotEmpty().WithMessage("Geçerli bir ad girin");
        RuleFor(p => p.FirstName).MinimumLength(3).WithMessage("Kullanıcı adı en az 3 karakter olmalıdır");

        RuleFor(p => p.LastName).NotEmpty().WithMessage("Geçerli bir soyad girin!");
        RuleFor(p => p.LastName).MinimumLength(3).WithMessage("Geçerli bir soyad girin!");

        RuleFor(p => p.Email).NotEmpty().WithMessage("Geçerli bir e-posta adresi girin");
        RuleFor(p => p.Email).MinimumLength(3).WithMessage("Geçerli bir e-posta adresi girin");
        RuleFor(p => p.Email).Matches(".+@.+").WithMessage("E-posta adresi '@' işareti içermelidir");

        RuleFor(p => p.UserName).NotEmpty().WithMessage("Geçerli bir kullanıcı adı girin");
        RuleFor(p => p.UserName).MinimumLength(3).WithMessage("Geçerli bir kullanıcı adı girin");
    }
}
