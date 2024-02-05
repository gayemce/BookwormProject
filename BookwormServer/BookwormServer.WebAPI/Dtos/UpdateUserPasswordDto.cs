namespace BookwormServer.WebAPI.Dtos;

public class UpdateUserPasswordDto
{
    public int Id { get; set; }
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
    public string ConfirmedPassword { get; set; } = string.Empty;
}
