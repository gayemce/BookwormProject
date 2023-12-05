using BookwormServer.WebAPI.Enums;
using BookwormServer.WebAPI.Models;

namespace BookwormServer.WebAPI.Dtos;

public class BookDetailDto
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public Book Book { get; set; }
    public List<BookCoverTypeEn> CoverTypeEn { get; set; }
    public List<BookCoverTypeEn> CoverTypeTr { get; set; }
    public string ISBN { get; set; } = string.Empty;
    public string PublicationDate { get; set; } = string.Empty;
    public string PublicationCityCountry { get; set; } = string.Empty;
    public int LanguageId { get; set; } = 0;
    public string LanguageEn { get; set; } = string.Empty;
    public string LanguageTr { get; set; } = string.Empty;
}
