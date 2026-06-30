using CampBooking.Application.DTOs.Camp;
using CampBooking.Domain.Entities;

namespace CampBooking.Application.Interfaces.Repositories;

public interface ICampRepository
{
    // Read

    Task<IEnumerable<Camp>> GetAllAsync();

    Task<Camp?> GetByIdAsync(Guid id);

    // Search

    Task<IEnumerable<Camp>> SearchAsync(
        SearchCampDto dto);

    // Create

    Task AddAsync(Camp camp);

    // Update

    Task UpdateAsync(Camp camp);

    // Delete

    Task DeleteAsync(Camp camp);

    // Save

    Task SaveChangesAsync();
}