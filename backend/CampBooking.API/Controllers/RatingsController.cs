using System.Security.Claims;
using CampBooking.Application.DTOs.Rating;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RatingsController : ControllerBase
{
    private readonly IRatingService _ratingService;

    public RatingsController(
        IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    // ==========================================
    // CREATE RATING
    // ==========================================

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> AddRating(
        CreateRatingDto dto)
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!;

        await _ratingService.AddRatingAsync(
            userId,
            dto);

        return Created(
            string.Empty,
            "Rating added successfully.");
    }

    // ==========================================
    // UPDATE RATING
    // ==========================================

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateRating(
        Guid id,
        UpdateRatingDto dto)
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!;

        await _ratingService.UpdateRatingAsync(
            userId,
            id,
            dto);

        return Ok(
            "Rating updated successfully.");
    }

    // ==========================================
    // DELETE RATING
    // ==========================================

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteRating(
        Guid id)
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier)!;

        await _ratingService.DeleteRatingAsync(
            userId,
            id);

        return Ok(
            "Rating deleted successfully.");
    }

    // ==========================================
    // GET RATING BY ID
    // ==========================================

    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetRatingById(
        Guid id)
    {
        var rating =
            await _ratingService
                .GetRatingByIdAsync(id);

        if (rating == null)
        {
            return NotFound(
                "Rating not found.");
        }

        return Ok(rating);
    }

    // ==========================================
    // GET CAMP RATINGS
    // ==========================================

    [AllowAnonymous]
    [HttpGet("camp/{campId:guid}")]
    public async Task<IActionResult> GetCampRatings(
        Guid campId)
    {
        var ratings =
            await _ratingService
                .GetCampRatingsAsync(campId);

        return Ok(ratings);
    }

    // ==========================================
    // GET ALL RATINGS (ADMIN)
    // ==========================================

    [Authorize(Roles = Roles.Admin)]
    [HttpGet]
    public async Task<IActionResult> GetAllRatings()
    {
        var ratings =
            await _ratingService
                .GetAllRatingsAsync();

        return Ok(ratings);
    }
}