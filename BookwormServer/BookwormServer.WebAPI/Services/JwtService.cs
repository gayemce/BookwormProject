using BookwormServer.WebAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookwormServer.WebAPI.Services;

public class JwtService
{
    public string CreateToken(AppUser appUser, List<string?>? roles, bool rememberMe)
    {
        string token = string.Empty;

        List<Claim> claims = new();
        claims.Add(new("UserId", appUser.Id.ToString()));
        claims.Add(new("Name", appUser.GetName()));
        claims.Add(new("Email", appUser.Email ?? string.Empty));
        claims.Add(new("UserName", appUser.UserName ?? string.Empty));
        if (roles is not null) claims.Add(new("Roles", string.Join(",", roles)));

        DateTime expires = rememberMe ? DateTime.Now.AddMonths(1) : DateTime.Now.AddDays(1);

        JwtSecurityToken jwtSecurityToken = new(
            issuer: "Gaye Tekin",
            audience: "Bookworm Project",
            claims: claims,
            notBefore: DateTime.Now, //şuandan itibaren kullan
        expires: expires,
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my secret key my secret key my secret key 12345 ... my secret key my secret key my secret key 12345 ...")), SecurityAlgorithms.HmacSha512));

        JwtSecurityTokenHandler handler = new();
        token = handler.WriteToken(jwtSecurityToken);

        return token;
    }
}
