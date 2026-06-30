using CampBooking.Domain.Common;

namespace CampBooking.Domain.Entities;

public class Rating : BaseEntity
{
    public int Stars { get; set; }

    public string? Review { get; set; }

    public string UserId { get; set; } = string.Empty;

    public Guid CampId { get; set; }

    public Camp Camp { get; set; } = null!;

    public Guid BookingId { get; set; }

    public Booking Booking { get; set; } = null!;
}