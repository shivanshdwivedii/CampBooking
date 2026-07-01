using CampBooking.Application.DTOs.Booking;
using CampBooking.Application.Interfaces.Repositories;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Entities;
using CampBooking.Domain.Enums;

namespace CampBooking.Application.Services;

public partial class BookingService : IBookingService
{
    private readonly IBookingRepository _bookingRepository;
    private readonly ICampRepository _campRepository;

    public BookingService(
        IBookingRepository bookingRepository,
        ICampRepository campRepository)
    {
        _bookingRepository = bookingRepository;
        _campRepository = campRepository;
    }

    public async Task<BookingResponseDto> CreateBookingAsync(
        string userId,
        CreateBookingDto dto)
    {
        
 
 var camp = await _campRepository.GetByIdAsync(dto.CampId);

if (camp == null)
    throw new ApplicationException("Camp not found.");

if (dto.CheckInDate < camp.StartDate ||
    dto.CheckOutDate > camp.EndDate)
{
    throw new ApplicationException(
        $"Camp is available only between " +
        $"{camp.StartDate} and {camp.EndDate}.");
}

if (dto.CheckInDate <
    DateOnly.FromDateTime(DateTime.UtcNow))
{
    throw new ApplicationException(
        "Check-in date cannot be in the past.");
}

if (dto.CheckOutDate <= dto.CheckInDate)
{
    throw new ApplicationException(
        "Check-out date must be after check-in date.");
}
// Check-in validation

var totalNights =
    dto.CheckOutDate.DayNumber -
    dto.CheckInDate.DayNumber;

        if (totalNights > 30)
        {
            throw new ApplicationException(
                "Maximum booking duration is 30 nights.");
        }

        // Billing Address

        if (string.IsNullOrWhiteSpace(dto.BillingAddress))
        {
            throw new ApplicationException(
                "Billing address is required.");
        }

        // Phone Number

        if (string.IsNullOrWhiteSpace(dto.PhoneNumber))
        {
            throw new ApplicationException(
                "Phone number is required.");
        }

        dto.PhoneNumber = dto.PhoneNumber.Trim();




        if (dto.PhoneNumber.Length != 10)
        {
            throw new ApplicationException(
                "Phone number must contain exactly 10 digits.");
        }

        if (!dto.PhoneNumber.All(char.IsDigit))
        {
            throw new ApplicationException(
                "Phone number must contain only digits.");
        }

        // Guests validation

if (dto.Guests <= 0)
{
    throw new ApplicationException(
        "At least 1 guest is required.");
}

if (dto.Guests > camp.AvailableSeats)
{
    throw new ApplicationException(
        $"Only {camp.AvailableSeats} seats are available.");
}

        // Capacity Check

var bookedSeats =
    await _bookingRepository.GetBookedSeatsAsync(
        dto.CampId,
        dto.CheckInDate,
        dto.CheckOutDate);

if (bookedSeats + dto.Guests >
    camp.Capacity)
{
    throw new ApplicationException(
        "Not enough seats available.");
}
var booking = new Booking
{
    UserId = userId,

    CampId = dto.CampId,

    CheckInDate = dto.CheckInDate,

    CheckOutDate = dto.CheckOutDate,

    Guests = dto.Guests,

    TotalNights = totalNights,

    TotalAmount =
        totalNights * camp.PricePerNight,

    BillingAddress = dto.BillingAddress,

    PhoneNumber = dto.PhoneNumber,

    BookingReference =
        $"BK-{Guid.NewGuid().ToString("N")[..8].ToUpper()}",

    Status = BookingStatus.Confirmed
};
       
camp.AvailableSeats -= dto.Guests;

await _campRepository.UpdateAsync(camp);
await _campRepository.SaveChangesAsync();

await _bookingRepository.AddAsync(booking);
await _bookingRepository.SaveChangesAsync();

        booking.Camp = camp;

        return MapToDto(booking);
    }

    // =====================================================
    // GET BOOKING BY REFERENCE
    // =====================================================

    public async Task<BookingResponseDto?> GetBookingAsync(
        string bookingReference)
    {
        var booking =
            await _bookingRepository.GetByReferenceAsync(
                bookingReference);

        if (booking == null)
            return null;

        return MapToDto(booking);
    }

    // =====================================================
    // DTO MAPPING
    // =====================================================

    private static BookingResponseDto MapToDto(
        Booking booking)
    {
        return new BookingResponseDto
        {
            Id = booking.Id,

            BookingReference =
                booking.BookingReference,

            CampId = booking.CampId,

            CampName =
                booking.Camp?.Name ?? string.Empty,

            UserId = booking.UserId,

UserName =
    booking.User?.FullName
        ?? string.Empty,

            CheckInDate = booking.CheckInDate,

            CheckOutDate = booking.CheckOutDate,

            TotalNights = booking.TotalNights,

            TotalAmount = booking.TotalAmount,

            BillingAddress = booking.BillingAddress,

            PhoneNumber = booking.PhoneNumber,
Guests = booking.Guests,
            Status = booking.Status.ToString()
        };
    }

    // =====================================================
    // GET ALL BOOKINGS
    // =====================================================

    public async Task<IEnumerable<BookingResponseDto>> GetAllBookingsAsync()
    {
        var bookings =
            await _bookingRepository.GetAllAsync();

        return bookings.Select(MapToDto);
    }

    // =====================================================
    // GET BOOKING BY ID
    // =====================================================

    public async Task<BookingResponseDto?> GetBookingByIdAsync(
        Guid id)
    {
        var booking =
            await _bookingRepository.GetByIdAsync(id);

        if (booking == null)
            return null;

        return MapToDto(booking);
    }

    // =====================================================
    // GET MY BOOKINGS
    // =====================================================

    public async Task<IEnumerable<BookingResponseDto>>
        GetMyBookingsAsync(string userId)
    {
        var bookings =
            await _bookingRepository.GetUserBookingsAsync(userId);

        return bookings.Select(MapToDto);
    }

    // =====================================================
    // GET BOOKINGS BY STATUS
    // =====================================================

    public async Task<IEnumerable<BookingResponseDto>>
        GetBookingsByStatusAsync(BookingStatus status)
    {
        var bookings =
            await _bookingRepository.GetBookingsByStatusAsync(
                status);

        return bookings.Select(MapToDto);
    }

    // =====================================================
    // UPDATE BOOKING STATUS
    // =====================================================

    public async Task UpdateBookingStatusAsync(
        Guid bookingId,
        BookingStatus status)
    {
        var booking =
            await _bookingRepository.GetByIdAsync(bookingId);

        if (booking == null)
            throw new ApplicationException("Booking not found.");

        booking.Status = status;

        await _bookingRepository.UpdateAsync(booking);

        await _bookingRepository.SaveChangesAsync();
    }

    // =====================================================
    // CANCEL BOOKING
    // =====================================================

    public async Task CancelBookingAsync(
        string bookingReference)
    {
        var booking =
            await _bookingRepository.GetByReferenceAsync(
                bookingReference);

        if (booking == null)
        {
            throw new ApplicationException(
                "Booking not found.");
        }
if (booking.CheckInDate <=
    DateOnly.FromDateTime(DateTime.UtcNow))
{
    throw new ApplicationException(
        "Only future bookings can be cancelled.");
}
        var camp =
    await _campRepository.GetByIdAsync(
        booking.CampId);

if (camp != null)
{
    camp.AvailableSeats += booking.Guests;

    await _campRepository.UpdateAsync(camp);
    await _campRepository.SaveChangesAsync();
}

        if (booking.Status == BookingStatus.Cancelled)
        {
            throw new ApplicationException(
                "Booking is already cancelled.");
        }

        booking.Status = BookingStatus.Cancelled;

        await _bookingRepository.UpdateAsync(booking);

        await _bookingRepository.SaveChangesAsync();
    }
}