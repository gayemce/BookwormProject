using BookwormServer.WebAPI.Models;

namespace BookwormServer.WebAPI.Dtos;

public sealed record RequestDto(
    int? AuthorId,
    int? CategoryId,
    int? LanguageId,
    //string LanguageEn,
    //string LanguageTr,
    int PageNumber,
    int PageSize,
    string Search,
    string OrderBy);
