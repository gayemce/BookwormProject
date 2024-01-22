using Microsoft.AspNetCore.Identity;

namespace BookwormServer.WebAPI.Models;

public sealed class AppUser : IdentityUser<int>
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? PasswordConfirmed { get; set; } = string.Empty;
    public string GetName()
    {
        return string.Join(" ", FirstName, LastName);
    }

}
