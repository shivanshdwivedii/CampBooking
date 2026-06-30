using CampBooking.Application.DTOs.Dashboard;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Interfaces.Services;

namespace CampBooking.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService(
        IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    // ==========================================
    // GET DASHBOARD
    // ==========================================

    public async Task<DashboardResponseDto> GetDashboardAsync()
    {
        return await _dashboardRepository
            .GetDashboardAsync();
    }
}