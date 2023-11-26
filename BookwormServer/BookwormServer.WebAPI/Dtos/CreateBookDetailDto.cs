using BookwormServer.WebAPI.Models;

namespace BookwormServer.WebAPI.Dtos;

public class CreateBookDetailDto
{
    public int BookId { get; set; }
    public string CoverFormatEn { get; set; } = string.Empty;
    public string CoverFormatTr { get; set; } = string.Empty;
    public string ISBN { get; set; } = string.Empty;
    public string PublicationDate { get; set; } = string.Empty;
    public string PublicationCityCountry { get; set; } = string.Empty;
    public int LanguageId { get; set; } = 0;
    public string LanguageEn { get; set; } = string.Empty;
    public string LanguageTr { get; set; } = string.Empty;
}
