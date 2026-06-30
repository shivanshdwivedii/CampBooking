using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = Roles.Admin)]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(
        IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    // ==========================================
    // ADMIN DASHBOARD
    // ==========================================

    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        var dashboard =
            await _dashboardService.GetDashboardAsync();

        return Ok(dashboard);
    }
}