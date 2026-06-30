public class CreateBookingDto
{
    public Guid CampId { get; set; }

    public DateTime CheckInDate { get; set; }

    public DateTime CheckOutDate { get; set; }

    public int Guests { get; set; }

    public string BillingAddress { get; set; }
        = string.Empty;

    public string PhoneNumber { get; set; }
        = string.Empty;
}