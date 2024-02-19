using BookwormServer.WebAPI.Dtos;
using FluentValidation;

namespace BookwormServer.WebAPI.Validators;

public class ReviewCreateValidator : AbstractValidator<CreateReviewDto>
{
    public ReviewCreateValidator()
    {
        RuleFor(p => p.Title).NotEmpty().WithMessage("Başlık alanı boş olamaz");
        RuleFor(p => p.Comment).NotEmpty().WithMessage("Yorum alanı boş olamaz");
        RuleFor(p => p.Raiting)
            .NotEmpty().WithMessage("Derecelendirme alanı boş olamaz")
            .InclusiveBetween((short)1, (short)5).WithMessage("Derecelendirme 1 ile 5 arasında olmalıdır");
    }
}
