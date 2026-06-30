namespace CampBooking.Application.DTOs.Rating;

public class CreateRatingDto
{
    public Guid CampId { get; set; }

    public Guid BookingId { get; set; }

    public int Stars { get; set; }

    public string? Review { get; set; }
}