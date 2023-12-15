namespace BookwormServer.WebAPI.Dtos;

public sealed record LoginDto(
    string UserNameOrEmail,
    string Password,
    bool RememberMe = false);
