namespace CampBooking.Application.DTOs.Camp;

public class CampResponseDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Location { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal PricePerNight { get; set; }

    public int Capacity { get; set; }

    public int AvailableSeats { get; set; }

public DateOnly StartDate { get; set; }
public DateOnly EndDate { get; set; }

    public string Category { get; set; } = string.Empty;

    public List<string> Amenities { get; set; } = new();

    public string? ImageUrl { get; set; }

    public decimal AverageRating { get; set; }

    public int TotalRatings { get; set; }

    // 👇 ADD THIS
    public bool HasBookings { get; set; }
}