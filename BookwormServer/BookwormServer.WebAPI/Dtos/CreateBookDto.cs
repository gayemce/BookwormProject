namespace BookwormServer.WebAPI.Dtos;

public sealed record CreateBookDto(
    string Title,
    string Author,
    string DescriptionEn,
    string DescriptionTr,
    string Publisher,
    decimal Price,
    string ImgUrl,
    int Quantity);
