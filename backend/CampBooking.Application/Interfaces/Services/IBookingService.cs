using CampBooking.Application.DTOs.Booking;
using CampBooking.Domain.Enums;

namespace CampBooking.Application.Interfaces.Services;

public interface IBookingService
{
    // User
    Task<BookingResponseDto> CreateBookingAsync(
        string userId,
        CreateBookingDto dto);

    Task<BookingResponseDto?> GetBookingAsync(
        string bookingReference);

    Task<IEnumerable<BookingResponseDto>> GetMyBookingsAsync(
        string userId);

    Task CancelBookingAsync(
        string bookingReference);

    // Admin
    Task<IEnumerable<BookingResponseDto>> GetAllBookingsAsync();

    Task<BookingResponseDto?> GetBookingByIdAsync(
        Guid id);

    Task<IEnumerable<BookingResponseDto>> GetBookingsByStatusAsync(
        BookingStatus status);

    Task UpdateBookingStatusAsync(
        Guid id,
        BookingStatus status);
}