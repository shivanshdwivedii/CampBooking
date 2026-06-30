
using CampBooking.Application.DTOs.Rating;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Entities;

namespace CampBooking.Application.Services;

public partial class RatingService : IRatingService
{
    private readonly IRatingRepository _ratingRepository;
private readonly ICampRepository _campRepository;
private readonly IBookingRepository _bookingRepository;

public RatingService(
    IRatingRepository ratingRepository,
    ICampRepository campRepository,
    IBookingRepository bookingRepository)
{
    _ratingRepository = ratingRepository;
    _campRepository = campRepository;
    _bookingRepository = bookingRepository;
}
    // ==========================================
    // CREATE RATING
    // ==========================================

    public async Task AddRatingAsync(
        string userId,
        CreateRatingDto dto)
    {
        var camp =
            await _campRepository.GetByIdAsync(dto.CampId);

        if (camp == null)
            throw new ApplicationException(
                "Camp not found.");

        var booking =
            await _bookingRepository
                .GetByIdWithCampAsync(dto.BookingId);

        if (booking == null)
            throw new ApplicationException(
                "Booking not found.");

        if (booking.UserId != userId)
        {
            throw new ApplicationException(
                "You can rate only your own booking.");
        }

        if (booking.CampId != dto.CampId)
        {
            throw new ApplicationException(
                "Invalid booking.");
        }

        if (booking.CheckOutDate.Date >
            DateTime.UtcNow.Date)
        {
            throw new ApplicationException(
                "Rating is allowed only after stay completion.");
        }

        var existingRating =
            await _ratingRepository
                .GetByBookingIdAsync(dto.BookingId);

        if (existingRating != null)
        {
            throw new ApplicationException(
                "You have already rated this booking.");
        }

        if (dto.Stars < 1 || dto.Stars > 5)
        {
            throw new ApplicationException(
                "Rating must be between 1 and 5.");
        }
        if (!string.IsNullOrWhiteSpace(dto.Review) &&
    dto.Review.Length > 500)
{
    throw new ApplicationException(
        "Review cannot exceed 500 characters.");
}

    var rating = new Rating
{
    UserId = userId,
    CampId = dto.CampId,
    BookingId = dto.BookingId,
    Stars = dto.Stars,
    Review = dto.Review?.Trim()
};
        await _ratingRepository.AddAsync(rating);

        await _ratingRepository.SaveChangesAsync();

        camp.AverageRating =
            (decimal)await _ratingRepository
                .GetAverageRatingAsync(dto.CampId);

        camp.TotalRatings =
            await _ratingRepository
                .GetTotalRatingsAsync(dto.CampId);

        await _campRepository.UpdateAsync(camp);

        await _campRepository.SaveChangesAsync();
    }

    // ==========================================
    // DTO MAPPING
    // ==========================================

private async Task<RatingResponseDto> MapToDto(
    Rating rating)
{
    var userName =
        await _ratingRepository
            .GetUserNameAsync(
                rating.UserId);

    return new RatingResponseDto
    {
        Id = rating.Id,
        CampId = rating.CampId,
        BookingId = rating.BookingId,
        UserName =
            userName ?? "Camper",
        CampName =
            rating.Camp?.Name ?? string.Empty,
        Stars = rating.Stars,
        Review =
            rating.Review ?? string.Empty,
        CreatedAt =
            rating.CreatedAt
    };
}
        // ==========================================
    // UPDATE RATING
    // ==========================================

    public async Task UpdateRatingAsync(
        string userId,
        Guid ratingId,
        UpdateRatingDto dto)
    {
        var rating =
            await _ratingRepository.GetByIdAsync(ratingId);

        if (rating == null)
            throw new ApplicationException(
                "Rating not found.");

        if (rating.UserId != userId)
        {
            throw new ApplicationException(
                "You can update only your own rating.");
        }

        if (dto.Stars < 1 || dto.Stars > 5)
        {
            throw new ApplicationException(
                "Rating must be between 1 and 5.");
        }

if (!string.IsNullOrWhiteSpace(dto.Review) &&
    dto.Review.Length > 500)
{
    throw new ApplicationException(
        "Review cannot exceed 500 characters.");
}
        rating.Stars = dto.Stars;
rating.Review =
    dto.Review?.Trim() ?? string.Empty;
        await _ratingRepository.UpdateAsync(rating);

        await _ratingRepository.SaveChangesAsync();

        var camp =
            await _campRepository.GetByIdAsync(rating.CampId);

        if (camp != null)
        {
            camp.AverageRating =
                (decimal)await _ratingRepository
                    .GetAverageRatingAsync(camp.Id);

            camp.TotalRatings =
                await _ratingRepository
                    .GetTotalRatingsAsync(camp.Id);

            await _campRepository.UpdateAsync(camp);

            await _campRepository.SaveChangesAsync();
        }
    }

    // ==========================================
    // DELETE RATING
    // ==========================================

public async Task DeleteRatingAsync(
    string userId,
    Guid ratingId)
    {
        var rating =
            await _ratingRepository.GetByIdAsync(ratingId);

        if (rating == null)
            throw new ApplicationException(
                "Rating not found.");

        if (rating.UserId != userId)
        {
            throw new ApplicationException(
                "You can delete only your own rating.");
        }

        var camp =
            await _campRepository.GetByIdAsync(rating.CampId);

        await _ratingRepository.DeleteAsync(rating);

        await _ratingRepository.SaveChangesAsync();

        if (camp != null)
        {
            camp.AverageRating =
                (decimal)await _ratingRepository
                    .GetAverageRatingAsync(camp.Id);

            camp.TotalRatings =
                await _ratingRepository
                    .GetTotalRatingsAsync(camp.Id);

            await _campRepository.UpdateAsync(camp);

            await _campRepository.SaveChangesAsync();
        }
    }
        // ==========================================
    // GET RATING BY ID
    // ==========================================

public async Task<RatingResponseDto?> GetRatingByIdAsync(
    Guid ratingId)
{
    var rating =
        await _ratingRepository.GetByIdAsync(ratingId);

    if (rating == null)
        return null;

    return await MapToDto(rating);
}

    // ==========================================
    // GET CAMP RATINGS
    // ==========================================

    public async Task<IEnumerable<RatingResponseDto>>
        GetCampRatingsAsync(Guid campId)
    {
        var ratings =
            await _ratingRepository.GetByCampIdAsync(campId);

      var result =
    await Task.WhenAll(
        ratings.Select(MapToDto));

return result;
    }

    // ==========================================
    // GET ALL RATINGS
    // ==========================================

    public async Task<IEnumerable<RatingResponseDto>>
        GetAllRatingsAsync()
    {
        var ratings =
            await _ratingRepository.GetAllAsync();

var result =
    await Task.WhenAll(
        ratings.Select(MapToDto));

return result;
    }
}