using CampBooking.Application.DTOs.Camp;

namespace CampBooking.Application.Interfaces.Services;

public interface ICampService
{
    // Read

    Task<IEnumerable<CampResponseDto>> GetAllAsync();

    Task<CampResponseDto?> GetByIdAsync(Guid id);

    // Search

    Task<IEnumerable<CampResponseDto>> SearchAsync(
        SearchCampDto dto);

    // Create

    Task CreateAsync(CreateCampDto dto);

    // Update

    Task UpdateAsync(
        Guid id,
        UpdateCampDto dto);

    // Delete

    Task DeleteAsync(Guid id);
}