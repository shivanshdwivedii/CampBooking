using CampBooking.Domain.Common;

namespace CampBooking.Domain.Entities;

public class Camp : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string Location { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal PricePerNight { get; set; }

    public int Capacity { get; set; }

    public int AvailableSeats { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public string Category { get; set; } = string.Empty;

public string Amenities { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }

    public decimal AverageRating { get; set; }

    public int TotalRatings { get; set; }

    public ICollection<Booking> Bookings { get; set; } =
        new List<Booking>();

    public ICollection<Rating> Ratings { get; set; } =
        new List<Rating>();
}