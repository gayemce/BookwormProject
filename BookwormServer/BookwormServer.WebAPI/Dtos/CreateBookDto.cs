using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Dtos;

public sealed record CreateBookDto(
    string Title,
    int AuthorId,
    int BookDetailId,
    int BookLanguageId,
    string DescriptionEn,
    string DescriptionTr,
    string Publisher,
    Money Price,
    string ImgUrl,
    int Quantity,
    bool IsFeatured,
    List<int> CategoryIds);
