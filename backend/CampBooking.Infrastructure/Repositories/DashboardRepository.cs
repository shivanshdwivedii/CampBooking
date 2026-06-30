using CampBooking.Application.DTOs.Dashboard;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Domain.Enums;
using CampBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampBooking.Infrastructure.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly ApplicationDbContext _context;

    public DashboardRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardResponseDto> GetDashboardAsync()
    {
        var totalCamps =
            await _context.Camps.CountAsync();

        var totalBookings =
            await _context.Bookings.CountAsync();

        var totalUsers =
            await _context.Users.CountAsync();

        var totalRatings =
            await _context.Ratings.CountAsync();

        var totalRevenue =
            await _context.Bookings
                .Where(b => b.Status == BookingStatus.Confirmed)
                .SumAsync(b => (decimal?)b.TotalAmount) ?? 0;

var averageRating = await _context.Ratings.AnyAsync()
    ? await _context.Ratings.AverageAsync(r => (decimal)r.Stars)
    : 0m;

        var confirmedBookings =
            await _context.Bookings
                .CountAsync(b => b.Status == BookingStatus.Confirmed);

        var cancelledBookings =
            await _context.Bookings
                .CountAsync(b => b.Status == BookingStatus.Cancelled);

        return new DashboardResponseDto
        {
            TotalCamps = totalCamps,

            TotalBookings = totalBookings,

            TotalUsers = totalUsers,

            TotalRevenue = totalRevenue,

            TotalRatings = totalRatings,

            AverageRating = averageRating,

            ConfirmedBookings = confirmedBookings,

            CancelledBookings = cancelledBookings
        };
    }
}