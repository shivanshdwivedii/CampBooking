namespace CampBooking.Application.DTOs.Rating;

public class RatingResponseDto
{
    public Guid Id { get; set; }

    public Guid CampId { get; set; }

    public Guid BookingId { get; set; }

    public string UserName { get; set; }
        = string.Empty;

    public string CampName { get; set; }
        = string.Empty;

    public int Stars { get; set; }

    public string Review { get; set; }
        = string.Empty;

    public DateTime CreatedAt { get; set; }
}