namespace BookwormServer.WebAPI.Dtos;

public sealed record LoginDto(
    string UserNameOrEmail,
    string Password,
    bool RemeberMe = false);
