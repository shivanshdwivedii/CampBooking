using System.Security.Claims;
using CampBooking.Application.DTOs.Booking;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Constants;
using CampBooking.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingsController(
        IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    // =====================================================
    // USER
    // =====================================================

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateBooking(
        CreateBookingDto dto)
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!;

        var booking =
            await _bookingService.CreateBookingAsync(
                userId,
                dto);

        return CreatedAtAction(
    nameof(GetBooking),
    new
    {
        bookingReference = booking.BookingReference
    },
    booking);
    }

    [Authorize]
    [HttpGet("my-bookings")]
    public async Task<IActionResult> GetMyBookings()
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!;

        var bookings =
            await _bookingService.GetMyBookingsAsync(userId);

        return Ok(bookings);
    }

    [Authorize]
    [HttpDelete("{bookingReference}")]
    public async Task<IActionResult> CancelBooking(
        string bookingReference)
    {
        await _bookingService.CancelBookingAsync(
            bookingReference);

        return Ok("Booking cancelled successfully.");
    }


    

    // =====================================================
    // PUBLIC
    // =====================================================

[Authorize]
[HttpGet("{bookingReference}")]
public async Task<IActionResult> GetBooking(
    string bookingReference)
{
    var booking =
        await _bookingService.GetBookingAsync(
            bookingReference);

    if (booking == null)
        return NotFound();

    return Ok(booking);
}
    // =====================================================
    // ADMIN
    // =====================================================

    [Authorize(Roles = Roles.Admin)]
    [HttpGet]
    public async Task<IActionResult> GetAllBookings()
    {
        var bookings =
            await _bookingService.GetAllBookingsAsync();

        return Ok(bookings);
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpGet("id/{id:guid}")]
    public async Task<IActionResult> GetBookingById(
        Guid id)
    {
        var booking =
            await _bookingService.GetBookingByIdAsync(id);

        if (booking == null)
            return NotFound();

        return Ok(booking);
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpGet("status/{status}")]
    public async Task<IActionResult> GetBookingsByStatus(
        BookingStatus status)
    {
        var bookings =
            await _bookingService
                .GetBookingsByStatusAsync(status);

        return Ok(bookings);
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpPut("{id:guid}/status")]
    public async Task<IActionResult> UpdateBookingStatus(
        Guid id,
        [FromBody] BookingStatus status)
    {
        await _bookingService
            .UpdateBookingStatusAsync(id, status);

        return Ok("Booking status updated successfully.");
    }
}