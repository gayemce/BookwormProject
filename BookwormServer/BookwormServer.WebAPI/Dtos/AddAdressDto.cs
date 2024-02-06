namespace BookwormServer.WebAPI.Dtos;

public sealed record AddAddressDto(
        int AppUserId,
        string Country,
        string City,
        string ZipCode,
        string ContactName,
        string Description);
