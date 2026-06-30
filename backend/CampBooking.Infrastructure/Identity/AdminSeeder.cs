using CampBooking.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace CampBooking.Infrastructure.Identity;

public static class AdminSeeder
{
    public static async Task SeedAdminAsync(
        UserManager<ApplicationUser> userManager)
    {
        const string email = "admin@campbooking.com";

        var admin =
            await userManager.FindByEmailAsync(email);

        if (admin != null)
            return;

        admin = new ApplicationUser
        {
            FullName = "System Admin",
            Email = email,
            UserName = email
        };

        var result =
            await userManager.CreateAsync(
                admin,
                "Admin@123");

        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(
                admin,
                "Admin");
        }
    }
}