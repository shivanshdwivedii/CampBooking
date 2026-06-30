using Microsoft.AspNetCore.Http;

namespace CampBooking.Application.DTOs.Camp;

public class UpdateCampDto
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

    public List<string> Amenities { get; set; } = new();

    // Current frontend


public IFormFile? Image { get; set; }
    // Future file upload support
    //public IFormFile? Image { get; set; }
}