using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Dtos;

public sealed record SetShoppingCartsDto(
    int BookId,
    int AppUserId,
    int Quantity,
    Money Price);