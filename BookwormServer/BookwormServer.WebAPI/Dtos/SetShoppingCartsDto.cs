namespace BookwormServer.WebAPI.Dtos;

public sealed record SetShoppingCartsDto(
    int BookId,
    int Quantity);