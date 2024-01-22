using BookwormServer.WebAPI.Context;
using BookwormServer.WebAPI.Middleware;
using BookwormServer.WebAPI.Models;
using BookwormServer.WebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
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
            .AllowAnyOrigin() //ula�mas�n� istedi�imiz sitelere izin verilir => www.gaye.com
            .AllowAnyMethod(); //methodType => httpget, httppost, httpput
    });
});
#endregion

#region Depency Injection
builder.Services.AddScoped<AppDbContext>();
builder.Services.AddScoped<JwtService>();
#endregion

#region Authentication
//Kullna�c� giri� kontrol sisteminin aktif edilmesi i�in - JWT
builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new()
    {
        ValidateIssuer = true, //token� g�nderen ki�i bilgisi
        ValidateAudience = true, // token� kullanacak site ya da ki�i bilgisi
        ValidateIssuerSigningKey = true, //g�venlik anahtar� �retmesini sa�layan g�venlik s�zc���
        ValidateLifetime = true, // tokenin ya�am s�resini kontrol edilmesi
        ValidIssuer = "Gaye Tekin",
        ValidAudience = "Bookworm Project",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my secret key my secret key my secret key 12345 ... my secret key my secret key my secret key 12345 ..."))
    };
});
#endregion

#region Identity
//AddIdentity: Identity k�t�phanesinin DbContext ile ba�l� oldu�unu bildirmek i�in:
builder.Services.AddIdentity<AppUser, AppRole>(opt =>
{
    opt.Password.RequiredLength = 6;
    opt.SignIn.RequireConfirmedEmail = true;
    opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(1); //15 Yap�lacak.
    opt.Lockout.MaxFailedAccessAttempts = 2;
    opt.Lockout.AllowedForNewUsers = true;

}).AddEntityFrameworkStores<AppDbContext>();
#endregion

#region Presentation
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setup =>
{
    var jwtSecuritySheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Put **_ONLY_** yourt JWT Bearer token on textbox below!",

        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    setup.AddSecurityDefinition(jwtSecuritySheme.Reference.Id, jwtSecuritySheme);

    setup.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { jwtSecuritySheme, Array.Empty<string>() }
                });
});
#endregion


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Hata kontrol�
app.Use(async (context, next) =>
{
    try
    {
        await next(context);
    }
    catch (Exception ex)
    {
        throw;
    }
});

app.UseCors();

app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

ExtensionsMiddleware.AutoMigration(app);
ExtensionsMiddleware.CreateFirstUser(app);

app.Run();
