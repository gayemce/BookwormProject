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
            .AllowAnyOrigin() //ulaþmasýný istediðimiz sitelere izin verilir => www.gaye.com
            .AllowAnyMethod(); //methodType => httpget, httppost, httpput
    });
});
#endregion

#region Depency Injection
builder.Services.AddScoped<AppDbContext>();
builder.Services.AddScoped<JwtService>();
#endregion

#region Authentication
//Kullnaýcý giriþ kontrol sisteminin aktif edilmesi için - JWT
builder.Services.AddAuthentication().AddJwtBearer(options =>
{
    options.TokenValidationParameters = new()
    {
        ValidateIssuer = true, //tokený gönderen kiþi bilgisi
        ValidateAudience = true, // tokený kullanacak site ya da kiþi bilgisi
        ValidateIssuerSigningKey = true, //güvenlik anahtarý üretmesini saðlayan güvenlik sözcüðü
        ValidateLifetime = true, // tokenin yaþam süresini kontrol edilmesi
        ValidIssuer = "Gaye Tekin",
        ValidAudience = "Bookworm Project",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my secret key my secret key my secret key 12345 ... my secret key my secret key my secret key 12345 ..."))
    };
});
#endregion

#region Identity
//AddIdentity: Identity kütüphanesinin DbContext ile baðlý olduðunu bildirmek için:
builder.Services.AddIdentity<AppUser, AppRole>(opt =>
{
    opt.Password.RequiredLength = 6;
    opt.SignIn.RequireConfirmedEmail = true;
    opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(1); //15 Yapýlacak.
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

//Hata kontrolü
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
