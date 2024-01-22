namespace BookwormServer.WebAPI.Dtos;

public sealed record RegisterDto(
    string FirstName,
    string LastName,
    string Email,
    string UserName,
    string Password,
    string ConfirmedPassword);
