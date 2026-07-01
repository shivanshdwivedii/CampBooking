using CampBooking.Application.DTOs.Camp;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;
using CampBooking.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampBooking.Infrastructure.Repositories;

public class CampRepository : ICampRepository
{
    private readonly ApplicationDbContext _context;

    public CampRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    // ==========================================
    // GET ALL
    // ==========================================

    public async Task<IEnumerable<Camp>> GetAllAsync()
    {
        return await _context.Camps
            .Include(c => c.Ratings)
            .Include(c => c.Bookings)
            .ToListAsync();
    }

    // ==========================================
    // GET BY ID
    // ==========================================

    public async Task<Camp?> GetByIdAsync(Guid id)
    {
        return await _context.Camps
            .Include(c => c.Bookings)
            .Include(c => c.Ratings)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    // ==========================================
    // SEARCH
    // ==========================================

   public async Task<IEnumerable<Camp>> SearchAsync(
    SearchCampDto dto)
{
    var query = _context.Camps
        .Include(c => c.Bookings)
        .Include(c => c.Ratings)
        .AsQueryable();

    // Location

    if (!string.IsNullOrWhiteSpace(dto.Location))
    {
        query = query.Where(c =>
            c.Location.Contains(dto.Location));
    }

    // Category

    if (!string.IsNullOrWhiteSpace(dto.Category))
    {
        query = query.Where(c =>
            c.Category == dto.Category);
    }

    // Guest Capacity

    if (dto.Capacity > 0)
    {
        query = query.Where(c =>
            c.Capacity >= dto.Capacity);
    }

if (dto.CheckInDate.HasValue &&
    dto.CheckOutDate.HasValue)
{
    var checkIn = dto.CheckInDate.Value;
    var checkOut = dto.CheckOutDate.Value;

    query = query.Where(c =>
        c.StartDate <= checkIn &&
        c.EndDate >= checkOut);

    query = query.Where(c =>
        (
            c.Capacity -
            (
                c.Bookings
                    .Where(b =>
                        b.Status == BookingStatus.Confirmed &&
                        checkIn < b.CheckOutDate &&
                        checkOut > b.CheckInDate)
                    .Sum(b => (int?)b.Guests) ?? 0
            )
        )
        >= (dto.Capacity > 0
            ? dto.Capacity
            : 1)
    );
}
    

    query = query
        .Skip((dto.Page - 1) * dto.PageSize)
        .Take(dto.PageSize);

    return await query.ToListAsync();
}

    // ==========================================
    // CREATE
    // ==========================================

    public async Task AddAsync(Camp camp)
    {
        await _context.Camps.AddAsync(camp);
    }

    // ==========================================
    // UPDATE
    // ==========================================

    public Task UpdateAsync(Camp camp)
    {
        _context.Camps.Update(camp);

        return Task.CompletedTask;
    }

    // ==========================================
    // DELETE
    // ==========================================

    public Task DeleteAsync(Camp camp)
    {
        _context.Camps.Remove(camp);

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