using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Dtos;

public sealed record CreateBookDto(
    string Title,
    int AuthorId,
    int BookDetailId,
    string DescriptionEn,
    string DescriptionTr,
    string Publisher,
    Money Price,
    string ImgUrl,
    int Quantity,
    List<int> CategoryIds);
