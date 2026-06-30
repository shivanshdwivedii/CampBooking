using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;
using CampBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampBooking.Infrastructure.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly ApplicationDbContext _context;

    public BookingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    // ---------------- CREATE ----------------

    public async Task AddAsync(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);
    }

    // ---------------- READ ----------------

    public async Task<IEnumerable<Booking>> GetAllAsync()
    {
        return await _context.Bookings
            .Include(b => b.Camp)
.Include(b => b.User)

            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<Booking?> GetByIdAsync(Guid id)
    {
        return await _context.Bookings
            .Include(b => b.Camp)
.Include(b => b.User)

            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<Booking?> GetByReferenceAsync(
        string bookingReference)
    {
        return await _context.Bookings
            .Include(b => b.Camp)
.Include(b => b.User)

            .FirstOrDefaultAsync(b =>
                b.BookingReference == bookingReference);
    }

public async Task<IEnumerable<Booking>> GetUserBookingsAsync(
    string userId)
    {
        return await _context.Bookings
            .Include(b => b.Camp)
.Include(b => b.User)

            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

public async Task<int> GetActiveBookingCountAsync(
    Guid campId,
    DateTime checkInDate,
    DateTime checkOutDate)
{
    return await _context.Bookings
        .CountAsync(b =>
            b.CampId == campId &&
            b.Status == BookingStatus.Confirmed &&
            checkInDate < b.CheckOutDate &&
            checkOutDate > b.CheckInDate);
}
public async Task<IEnumerable<Booking>> GetBookingsByStatusAsync(
    BookingStatus status)
    {
        return await _context.Bookings
            .Include(b => b.Camp)
.Include(b => b.User)

            .Where(b => b.Status == status)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    // ---------------- BUSINESS ----------------

public async Task<int> GetBookedSeatsAsync(
    Guid campId,
    DateTime checkInDate,
    DateTime checkOutDate)
{
    return await _context.Bookings
        .Where(b =>
            b.CampId == campId &&
            b.Status == BookingStatus.Confirmed &&
            checkInDate < b.CheckOutDate &&
            checkOutDate > b.CheckInDate)
        .SumAsync(b => b.Guests);
}

//---//
public async Task<Booking?> GetByIdWithCampAsync(Guid id)
{
    return await _context.Bookings
        .Include(b => b.Camp)
.Include(b => b.User)

        .Include(b => b.Rating)
        .FirstOrDefaultAsync(b => b.Id == id);
}

public async Task<bool> ExistsAsync(Guid id)
{
    return await _context.Bookings
        .AnyAsync(b => b.Id == id);
}
    // ---------------- UPDATE ----------------

    public Task UpdateAsync(Booking booking)
    {
        _context.Bookings.Update(booking);
        return Task.CompletedTask;
    }

    // ---------------- SAVE ----------------

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}