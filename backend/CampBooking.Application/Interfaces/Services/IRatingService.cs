using CampBooking.Application.DTOs.Rating;

namespace CampBooking.Application.Interfaces.Services;

public interface IRatingService
{
    // Create

    Task AddRatingAsync(
        string userId,
        CreateRatingDto dto);

    // Update

    Task UpdateRatingAsync(
        string userId,
        Guid ratingId,
        UpdateRatingDto dto);

    // Delete

Task DeleteRatingAsync(
    string userId,
    Guid ratingId);

    // Read

    Task<RatingResponseDto?> GetRatingByIdAsync(
        Guid ratingId);

    Task<IEnumerable<RatingResponseDto>> GetCampRatingsAsync(
        Guid campId);

    Task<IEnumerable<RatingResponseDto>> GetAllRatingsAsync();
}