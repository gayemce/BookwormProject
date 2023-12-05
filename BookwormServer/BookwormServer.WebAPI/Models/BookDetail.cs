using BookwormServer.WebAPI.Enums;

namespace BookwormServer.WebAPI.Models;

public sealed class BookDetail
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public Book Book { get; set; }
    public BookCoverTypeEn CoverTypeEn { get; set; }
    public BookCoverTypeTr CoverTypeTr { get; set; }
    public string ISBN { get; set; } = string.Empty;
    public string PublicationDate { get; set; } = string.Empty;
    public string PublicationCityCountry { get; set; } = string.Empty;
    public int LanguageId { get; set; } = 0;
    public string LanguageEn { get; set;} = string.Empty;
    public string LanguageTr { get; set;} = string.Empty;
}
