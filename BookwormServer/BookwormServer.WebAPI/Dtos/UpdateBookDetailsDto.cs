using BookwormServer.WebAPI.Enums;
using BookwormServer.WebAPI.Models;

namespace BookwormServer.WebAPI.Dtos;

public class UpdateBookDetailsDto
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public int Page { get; set; } = 0;
    public string ISBN { get; set; } = string.Empty;
    public string PublicationDate { get; set; } = string.Empty;
    public string PublicationCityCountryEn { get; set; } = string.Empty;
    public string PublicationCityCountryTr { get; set; } = string.Empty;
}
