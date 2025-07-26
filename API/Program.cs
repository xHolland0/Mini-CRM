using Microsoft.EntityFrameworkCore;
using API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using System.Text.Json.Serialization; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    options.Filters.Add(new AuthorizeFilter(policy));
})
.AddJsonOptions(options => 
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQLite veritabanı bağlantısını yapılandırma
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Auth0: Kimlik doğrulama hizmetlerini yapılandırma
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Authority, Auth0 Domain'inizin HTTPS URL'i olmalı
        options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/"; // <-- Burası düzeltildi
        options.Audience = builder.Configuration["Auth0:Audience"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier,
            
            // ValidIssuer, token'daki 'iss' claim'i ile tam olarak eşleşmeli
            // Auth0 genellikle domain'in sonunda bir slash ile issuer verir.
            ValidIssuer = $"https://{builder.Configuration["Auth0:Domain"]}/" // <-- Burası düzeltildi
        };
    });

// Auth0: Yetkilendirme hizmetlerini yapılandırma
builder.Services.AddAuthorization();

// CORS politikası ekleme
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React uygulamanızın adresi
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); 

app.UseRouting(); 

app.UseCors(); 

app.UseAuthentication(); 
app.UseAuthorization(); 

app.MapControllers();

app.Run();
