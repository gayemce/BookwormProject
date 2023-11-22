namespace BookwormServer.WebAPI.Dtos;

public sealed record RequestDto(
    int? AuthorId,
    int? CategoryId,
    int PageSize,
    string Search);
