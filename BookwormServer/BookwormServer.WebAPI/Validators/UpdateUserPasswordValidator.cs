using BookwormServer.WebAPI.Dtos;
using FluentValidation;

namespace BookwormServer.WebAPI.Validators;

public class UpdateUserPasswordValidator : AbstractValidator<UpdateUserPasswordDto>
{
    public UpdateUserPasswordValidator()
    {
        RuleFor(p => p.NewPassword).NotEmpty().WithMessage("Şifre alanı boş olamaz");
        RuleFor(p => p.NewPassword).Matches("[A-Z]").WithMessage("Şifre en az 1 adet büyük harf içermelidir!");
        RuleFor(p => p.NewPassword).Matches("[a-z]").WithMessage("Şifre en az 1 adet küçük harf içermelidir!");
        RuleFor(p => p.NewPassword).Matches("[0-9]").WithMessage("Şifre en az 1 rakam içermelidir!");
        RuleFor(p => p.NewPassword).Matches("[^a-zA-Z0-9]").WithMessage("Şifre en az 1 adet özel karakter içermelidir!");

        RuleFor(p => p.ConfirmedPassword).NotEmpty().WithMessage("Doğrulanmış şifre alanı boş olamaz");
        RuleFor(p => p.ConfirmedPassword).Matches("[A-Z]").WithMessage("Doğrulanmış şifre en az 1 adet büyük harf içermelidir!");
        RuleFor(p => p.ConfirmedPassword).Matches("[a-z]").WithMessage("Doğrulanmış şifre en az 1 adet küçük harf içermelidir!");
        RuleFor(p => p.ConfirmedPassword).Matches("[0-9]").WithMessage("Doğrulanmış şifre en az 1 rakam içermelidir!");
        RuleFor(p => p.ConfirmedPassword).Matches("[^a-zA-Z0-9]").WithMessage("Doğrulanmış şifre en az 1 adet özel karakter içermelidir!");
    }
}
