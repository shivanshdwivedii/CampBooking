using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;

namespace CampBooking.Application.Interfaces.Repositories;

public interface IBookingRepository
{
    // ==========================================
    // CREATE
    // ==========================================

    Task AddAsync(Booking booking);

    // ==========================================
    // READ
    // ==========================================

    Task<IEnumerable<Booking>> GetAllAsync();

    Task<Booking?> GetByIdAsync(Guid id);

    Task<Booking?> GetByIdWithCampAsync(Guid id);

    Task<bool> ExistsAsync(Guid id);

    Task<Booking?> GetByReferenceAsync(string bookingReference);

    Task<IEnumerable<Booking>> GetUserBookingsAsync(string userId);

    Task<IEnumerable<Booking>> GetBookingsByStatusAsync(
        BookingStatus status);

    // ==========================================
    // BUSINESS
    // ==========================================


Task<int> GetBookedSeatsAsync(
    Guid campId,
    DateTime checkInDate,
    DateTime checkOutDate);

    // ==========================================
    // UPDATE
    // ==========================================

    Task UpdateAsync(Booking booking);

    // ==========================================
    // SAVE
    // ==========================================

    Task SaveChangesAsync();
}