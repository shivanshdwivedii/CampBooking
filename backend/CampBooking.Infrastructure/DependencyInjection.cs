using CampBooking.Application.Interfaces;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Application.Services;
using CampBooking.Infrastructure.Data;
using CampBooking.Infrastructure.Identity;
using CampBooking.Infrastructure.Repositories;
using CampBooking.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CampBooking.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")));

        // ==========================================
        // REPOSITORIES
        // ==========================================

        services.AddScoped<ICampRepository, CampRepository>();

        services.AddScoped<IBookingRepository, BookingRepository>();

        services.AddScoped<IRatingRepository, RatingRepository>();

        services.AddScoped<IDashboardRepository, DashboardRepository>();

        // ==========================================
        // SERVICES
        // ==========================================

        services.AddScoped<IAuthService, AuthService>();

        services.AddScoped<IJwtService, JwtService>();

        services.AddScoped<IImageService, ImageService>();

        services.AddScoped<ICampService, CampService>();

        services.AddScoped<IBookingService, BookingService>();

        services.AddScoped<IRatingService, RatingService>();

        services.AddScoped<IDashboardService, DashboardService>();

        return services;
    }
}