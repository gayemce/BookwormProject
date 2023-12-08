using BookwormServer.WebAPI.Enums;
using BookwormServer.WebAPI.Models;

namespace BookwormServer.WebAPI.Dtos;

public class UpdateBookDetailsDto
{
    public int Id { get; set; }
    public int BookId { get; set; }
    public string ISBN { get; set; } = string.Empty;
    public string PublicationDate { get; set; } = string.Empty;
    public string PublicationCityCountry { get; set; } = string.Empty;
}
