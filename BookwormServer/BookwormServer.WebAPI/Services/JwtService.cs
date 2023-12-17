using BookwormServer.WebAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookwormServer.WebAPI.Services;

public class JwtService
{
    public static string CreateToken(User user)
    {
        var claims = new Claim[]
        {
            new("UserId", user.Id.ToString()),
            new("UserName", user.LastName + " " + user.LastName)
        };

        JwtSecurityToken handler = new(
            issuer: "Issuer",
            audience: "audience",
            claims: claims,
            notBefore: DateTime.Now,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("My secret key my secret key my secret key my secret key")), SecurityAlgorithms.HmacSha256));

        //token üretildi
        string token = new JwtSecurityTokenHandler().WriteToken(handler);
        return token;
    }
}
