using CampBooking.Domain.Entities;

namespace CampBooking.Application.Interfaces.Repositories;

public interface IRatingRepository
{
    // Create

    Task AddAsync(Rating rating);

    // Read

    Task<Rating?> GetByIdAsync(Guid id);

    Task<Rating?> GetByBookingIdAsync(Guid bookingId);

    Task<IEnumerable<Rating>> GetByCampIdAsync(Guid campId);

    Task<IEnumerable<Rating>> GetAllAsync();

    // Business

    Task<double> GetAverageRatingAsync(Guid campId);

    Task<int> GetTotalRatingsAsync(Guid campId);

    // Update

    Task UpdateAsync(Rating rating);

    // Delete

Task<string?> GetUserNameAsync(string userId);


    Task DeleteAsync(Rating rating);

    // Save

    Task SaveChangesAsync();
}