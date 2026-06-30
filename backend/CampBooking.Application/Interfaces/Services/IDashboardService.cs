using CampBooking.Application.DTOs.Dashboard;

namespace CampBooking.Application.Interfaces.Services;

public interface IDashboardService
{
    Task<DashboardResponseDto> GetDashboardAsync();
}