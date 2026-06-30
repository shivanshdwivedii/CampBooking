namespace CampBooking.Application.DTOs.Dashboard;

public class DashboardResponseDto
{
    public int TotalCamps { get; set; }

    public int TotalBookings { get; set; }

    public int TotalUsers { get; set; }

    public decimal TotalRevenue { get; set; }

    public int TotalRatings { get; set; }

    public decimal AverageRating { get; set; }

    public int ConfirmedBookings { get; set; }

    public int CancelledBookings { get; set; }
}