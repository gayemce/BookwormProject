namespace BookwormServer.WebAPI.Dtos;

public sealed record BookDiscountDto(
    int BookId,
    int DiscountPercentage,
    DateTime StartDate,
    DateTime EndDate);
