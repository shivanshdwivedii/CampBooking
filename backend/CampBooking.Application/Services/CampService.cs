using CampBooking.Application.DTOs.Camp;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;
using System.Text.Json;
namespace CampBooking.Application.Services;

public class CampService : ICampService
{
    private readonly ICampRepository _campRepository;
    private readonly IImageService _imageService;

    public CampService(
        ICampRepository campRepository,
        IImageService imageService)
    {
        _campRepository = campRepository;
        _imageService = imageService;
    }

    // ==========================================
    // GET ALL CAMPS
    // ==========================================

    public async Task<IEnumerable<CampResponseDto>> GetAllAsync()
    {
        var camps = await _campRepository.GetAllAsync();

        return camps.Select(MapToDto);
    }

    // ==========================================
    // GET CAMP BY ID
    // ==========================================

    public async Task<CampResponseDto?> GetByIdAsync(Guid id)
    {
        var camp = await _campRepository.GetByIdAsync(id);

        if (camp == null)
            return null;

        return MapToDto(camp);
    }

    // ==========================================
    // SEARCH CAMPS
    // ==========================================

public async Task<IEnumerable<CampResponseDto>> SearchAsync(
    SearchCampDto dto)
{
    // ============================
    // VALIDATIONS
    // ============================

if (dto.CheckInDate.HasValue &&
    dto.CheckOutDate.HasValue &&
    dto.CheckOutDate <= dto.CheckInDate)
{
    throw new ApplicationException(
        "Check-out date must be after check-in date.");
}

    dto.Page = Math.Max(dto.Page, 1);

    dto.PageSize = Math.Clamp(dto.PageSize, 1, 50);

    // ============================
    // SEARCH
    // ============================

    var camps =
        await _campRepository.SearchAsync(dto);

    return camps.Select(MapToDto);
}

    // ==========================================
    // CREATE CAMP
    // ==========================================

    public async Task CreateAsync(CreateCampDto dto)
{
var imageUrl = await _imageService.SaveImageAsync(dto.Image);
    var camp = new Camp
    {
        Name = dto.Name,
        Location = dto.Location,
        Description = dto.Description,
        PricePerNight = dto.PricePerNight,
        Capacity = dto.Capacity,
        AvailableSeats = dto.AvailableSeats,
        StartDate = dto.StartDate,
        EndDate = dto.EndDate,
        Category = dto.Category,
        Amenities = JsonSerializer.Serialize(dto.Amenities),
        ImageUrl = imageUrl,
        AverageRating = 0,
        TotalRatings = 0
    };

    await _campRepository.AddAsync(camp);

    await _campRepository.SaveChangesAsync();
}
    // ==========================================
    // UPDATE CAMP
    // ==========================================

public async Task UpdateAsync(
    Guid id,
    UpdateCampDto dto)
{
    var camp =
        await _campRepository.GetByIdAsync(id);

    if (camp == null)
        throw new ApplicationException(
            "Camp not found.");

    // Cannot change dates if bookings exist
  if (camp.Bookings.Any(b =>
        b.Status == BookingStatus.Confirmed))
{
    if (camp.StartDate != dto.StartDate ||
        camp.EndDate != dto.EndDate ||
        camp.Capacity != dto.Capacity)
    {
        throw new ApplicationException(
            "Camp dates and capacity cannot be changed because bookings already exist.");
    }
}

    var today =
        DateOnly.FromDateTime(
            DateTime.UtcNow);

    if (dto.StartDate < today)
    {
        throw new ApplicationException(
            "Start date cannot be in the past.");
    }

    if (dto.EndDate < dto.StartDate)
    {
        throw new ApplicationException(
            "End date must be after start date.");
    }

    camp.Name = dto.Name;
    camp.Location = dto.Location;
    camp.Description = dto.Description;
    camp.PricePerNight = dto.PricePerNight;
    camp.Capacity = dto.Capacity;
    camp.AvailableSeats = dto.AvailableSeats;
    camp.StartDate = dto.StartDate;
    camp.EndDate = dto.EndDate;
    camp.Category = dto.Category;
    camp.Amenities =
        JsonSerializer.Serialize(dto.Amenities);

    if (dto.Image != null)
    {
        camp.ImageUrl =
            await _imageService
                .SaveImageAsync(dto.Image);
    }

    await _campRepository.UpdateAsync(camp);
    await _campRepository.SaveChangesAsync();
}

    // ==========================================
    // DELETE CAMP
    // ==========================================

    public async Task DeleteAsync(Guid id)
    {
        var camp =
            await _campRepository.GetByIdAsync(id);

        if (camp == null)
            throw new ApplicationException("Camp not found.");

        if (camp.Bookings?.Any() == true)
        {
            throw new ApplicationException(
                "Camp cannot be deleted because bookings already exist.");
        }

        await _campRepository.DeleteAsync(camp);

        await _campRepository.SaveChangesAsync();
    }

    // ==========================================
    // COMMON DTO MAPPING
    // ==========================================
private static CampResponseDto MapToDto(Camp camp)
{
    return new CampResponseDto
    {
        Id = camp.Id,
        Name = camp.Name,
        Location = camp.Location,
        Description = camp.Description,
        PricePerNight = camp.PricePerNight,
        Capacity = camp.Capacity,
        AvailableSeats = camp.AvailableSeats,
        StartDate = camp.StartDate,
        EndDate = camp.EndDate,
        Category = camp.Category,
        Amenities = string.IsNullOrWhiteSpace(camp.Amenities)
            ? new List<string>()
            : JsonSerializer.Deserialize<List<string>>(camp.Amenities)
                ?? new List<string>(),
        ImageUrl = camp.ImageUrl,
        AverageRating = camp.AverageRating,
        TotalRatings = camp.TotalRatings,

        // 👇 ADD THIS
        HasBookings =
            camp.Bookings?.Any(
                b => b.Status ==
                     BookingStatus.Confirmed
            ) ?? false
    };
}
}