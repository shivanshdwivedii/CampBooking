using CampBooking.Domain.Common;
using CampBooking.Domain.Enums;

namespace CampBooking.Domain.Entities;

public class Booking : BaseEntity
{
    public string UserId { get; set; } = string.Empty;

    // 👇 ADD THIS
    public ApplicationUser User { get; set; } = null!;

    public Guid CampId { get; set; }

    public Camp Camp { get; set; } = null!;

public int Guests { get; set; } = 1;

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public int TotalNights { get; set; }



    public decimal TotalAmount { get; set; }

    public string BillingAddress { get; set; }
        = string.Empty;

    public string PhoneNumber { get; set; }
        = string.Empty;

    public string BookingReference { get; set; }
        = string.Empty;

    public BookingStatus Status { get; set; }
        = BookingStatus.Confirmed;

    public Rating? Rating { get; set; }
}