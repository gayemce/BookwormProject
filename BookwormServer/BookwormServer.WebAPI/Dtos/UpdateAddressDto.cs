namespace BookwormServer.WebAPI.Dtos;

public sealed record UpdateAddressDto(
    int Id,
    int AppUserId,
    string Country,
    string City,
    string ZipCode,
    string ContactName,
    string Description);
