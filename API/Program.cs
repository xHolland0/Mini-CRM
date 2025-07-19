using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// DB CONTEXT
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddControllers();

// Auth0 Kimlik Doğrulaması
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Auth0 Domain'ini ve Audience'ı appsettings.json'dan al
        options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/";
        options.Audience = builder.Configuration["Auth0:Audience"];

        // Token doğrulama parametreleri
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true, // Audience'ı doğrula
            ValidateIssuer = true,   // Issuer'ı (Auth0 Domain) doğrula
            ValidateLifetime = true, // Token'ın süresinin dolup dolmadığını kontrol et
            ValidateIssuerSigningKey = true, // Token'ın imzasını doğrula

            // Geçerli Audience ve Issuer değerlerini açıkça belirt
            ValidAudience = builder.Configuration["Auth0:Audience"],
            ValidIssuer = $"https://{builder.Configuration["Auth0:Domain"]}/"
        };
    });

builder.Services.AddAuthorization(); // Authorization servisi

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middlewares
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS yönlendirme ve Auth
app.UseHttpsRedirection();
app.UseAuthentication(); 
app.UseAuthorization();  

// Routing
app.MapControllers();

app.Run();