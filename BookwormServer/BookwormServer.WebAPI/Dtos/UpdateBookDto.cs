namespace BookwormServer.WebAPI.Dtos;

public sealed record UpdateBookDto(
    int Id,
    string Title,
    string Author,
    string DescriptionEn,
    string DescriptionTr,
    string Publisher,
    decimal Price,
    string ImgUrl,
    int Quantity,
    List<int> CategoryIds);
