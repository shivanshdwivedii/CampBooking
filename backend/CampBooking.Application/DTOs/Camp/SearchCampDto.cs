namespace CampBooking.Application.DTOs.Camp;

public class SearchCampDto
{
    // Search Filters

    public string? Location { get; set; }

    public string? Category { get; set; }

public DateOnly? CheckInDate { get; set; }
public DateOnly? CheckOutDate { get; set; }

    public int Capacity { get; set; }

    // Pagination

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}