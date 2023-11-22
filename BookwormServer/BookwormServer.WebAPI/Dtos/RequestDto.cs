using BookwormServer.WebAPI.Models;

namespace BookwormServer.WebAPI.Dtos;

public sealed record RequestDto(
    int? AuthorId,
    int? CategoryId,
    string? LanguageName,
    int PageSize,
    string Search);
