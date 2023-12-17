using BookwormServer.WebAPI.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

#region Cors
builder.Services.AddCors(configure =>
{
    configure.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyHeader() //contentType => aplication/json, application/text
            .AllowAnyOrigin() //ulaþmasýný istediðimiz sitelere izin verilir => www.gaye.com
            .AllowAnyMethod(); //methodType => httpget, httppost, httpput
    });
});
#endregion

#region Depency Injection
builder.Services.AddScoped<AppDbContext>();
#endregion

#region Presentation
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
#endregion


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
