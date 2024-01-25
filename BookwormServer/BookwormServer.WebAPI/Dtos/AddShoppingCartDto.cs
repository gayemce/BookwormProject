using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Dtos;

public sealed record AddShoppingCartDto(
    int BookId,
    Money Price,
    int Quantity,
    int AppUserId);
