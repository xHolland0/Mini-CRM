using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// CORS Politikası Tanımlama
// "AllowSpecificOrigin" adında bir CORS politikası tanımlıyoruz
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            // React uygulamanızın çalıştığı URL'e izin verin
            // BURAYI KENDİ REACT UYGULAMANIZIN URL'İ İLE GÜNCELLEYİN!
            // http://localhost:3000 veya https://localhost:3000 (eğer React'ı HTTPS'te çalıştırıyorsanız)
            policy.WithOrigins("http://localhost:3000") 
                  .AllowAnyHeader() // Tüm başlıklara izin ver
                  .AllowAnyMethod(); // Tüm HTTP metotlarına (GET, POST, PUT, DELETE) izin ver
        });
});

// DB CONTEXT
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddControllers();

// Auth0 Kimlik Doğrulaması
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/";
        options.Audience = builder.Configuration["Auth0:Audience"];

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
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

// CORS middleware'ini ekle
// CORS, kimlik doğrulama ve yetkilendirmeden ÖNCE gelmelidir.
// Ayrıca HTTPS yönlendirmeden de önce gelmelidir.
app.UseCors("AllowSpecificOrigin"); // Tanımladığımız politikayı kullan

app.UseHttpsRedirection(); // HTTPS yönlendirme
app.UseStaticFiles(); // Statik dosyaları sunar (CSS, JS, resimler vb.) - genelde burada kalabilir

app.UseAuthentication(); // Kimlik doğrulama
app.UseAuthorization();  // Yetkilendirme

// Routing
app.MapControllers();

app.Run();
