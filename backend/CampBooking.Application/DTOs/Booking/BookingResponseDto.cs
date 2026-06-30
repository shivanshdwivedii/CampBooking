namespace CampBooking.Application.DTOs.Booking;

public class BookingResponseDto
{
    public Guid Id { get; set; }

    public string BookingReference { get; set; } = string.Empty;

    public Guid CampId { get; set; }

    public string CampName { get; set; } = string.Empty;

    public string UserId { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;
    
public int Guests { get; set; }

        public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public int TotalNights { get; set; }

    public decimal TotalAmount { get; set; }

    public string BillingAddress { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
}