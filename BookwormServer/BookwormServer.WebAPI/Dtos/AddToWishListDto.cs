using BookwormServer.WebAPI.ValueObjects;

namespace BookwormServer.WebAPI.Dtos;

public sealed record class AddToWishListDto(
    int BookId,
    int AppUserId,
    Money Price);
