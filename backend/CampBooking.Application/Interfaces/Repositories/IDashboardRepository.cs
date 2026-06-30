using CampBooking.Application.DTOs.Dashboard;

namespace CampBooking.Application.Interfaces.Repositories;

public interface IDashboardRepository
{
    Task<DashboardResponseDto> GetDashboardAsync();
}