using BookwormServer.WebAPI.Dtos;
using FluentValidation;
using Iyzipay.Model;

namespace BookwormServer.WebAPI.Validators;

public sealed class LoginValidator : AbstractValidator<LoginDto>
{
    public LoginValidator()
    {
        RuleFor(p => p.UserNameOrEmail).NotEmpty().WithMessage("Geçerli bir kullanıcı adı ya da email adresi girin");
        RuleFor(p => p.UserNameOrEmail).MinimumLength(3).WithMessage("Kullanıcı adı en az 3 karakter olmalıdır");
        RuleFor(p => p.Password).NotEmpty().WithMessage("Şifre alanı boş olamaz");
        RuleFor(p => p.Password).Matches("[A-Z]").WithMessage("Şifre en az 1 adet büyük harf içermelidir!");
        RuleFor(p => p.Password).Matches("[a-z]").WithMessage("Şifre en az 1 adet küçük harf içermelidir!");
        RuleFor(p => p.Password).Matches("[0-9]").WithMessage("Şifre en az 1 rakam içermelidir!");
        RuleFor(p => p.Password).Matches("[^a-zA-Z0-9]").WithMessage("Şifre en az 1 adet özel karakter içermelidir!");
    }
}
