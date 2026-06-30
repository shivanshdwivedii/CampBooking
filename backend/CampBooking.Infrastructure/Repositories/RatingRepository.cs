using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Domain.Entities;
using CampBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampBooking.Infrastructure.Repositories;

public class RatingRepository : IRatingRepository
{
    private readonly ApplicationDbContext _context;

    public RatingRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    // ==========================================
    // CREATE
    // ==========================================

    public async Task AddAsync(Rating rating)
    {
        await _context.Ratings.AddAsync(rating);
    }

    // ==========================================
    // READ
    // ==========================================

public async Task<Rating?> GetByIdAsync(
    Guid id)
{
    return await _context.Ratings
        .Include(r => r.Camp)
        .Include(r => r.Booking)
        .FirstOrDefaultAsync(
            r => r.Id == id);
}

public async Task<Rating?> GetByBookingIdAsync(
    Guid bookingId)
{
    return await _context.Ratings
        .Include(r => r.Camp)
        .Include(r => r.Booking)
        .FirstOrDefaultAsync(
            r => r.BookingId == bookingId);
}

    public async Task<IEnumerable<Rating>>
    GetByCampIdAsync(Guid campId)
{
    return await _context.Ratings
        .Include(r => r.Camp)
        .Include(r => r.Booking)
        .Where(r => r.CampId == campId)
        .OrderByDescending(
            r => r.CreatedAt)
        .ToListAsync();
}

public async Task<IEnumerable<Rating>>
    GetAllAsync()
{
    return await _context.Ratings
        .Include(r => r.Camp)
        .Include(r => r.Booking)
        .OrderByDescending(
            r => r.CreatedAt)
        .ToListAsync();
}


public async Task<string?> GetUserNameAsync(
    string userId)
{
    return await _context.Users
        .Where(u => u.Id == userId)
        .Select(u => u.FullName)
        .FirstOrDefaultAsync();
}
    // ==========================================
    // BUSINESS
    // ==========================================

    public async Task<double>
        GetAverageRatingAsync(Guid campId)
    {
        return await _context.Ratings
            .Where(r => r.CampId == campId)
            .AverageAsync(
                r => (double?)r.Stars)
            ?? 0;
    }

    public async Task<int>
        GetTotalRatingsAsync(Guid campId)
    {
        return await _context.Ratings
            .CountAsync(
                r => r.CampId == campId);
    }

    // ==========================================
    // UPDATE
    // ==========================================

    public Task UpdateAsync(Rating rating)
    {
        _context.Ratings.Update(rating);

        return Task.CompletedTask;
    }

    // ==========================================
    // DELETE
    // ==========================================

    public Task DeleteAsync(Rating rating)
    {
        _context.Ratings.Remove(rating);

        return Task.CompletedTask;
    }

    // ==========================================
    // SAVE
    // ==========================================

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}