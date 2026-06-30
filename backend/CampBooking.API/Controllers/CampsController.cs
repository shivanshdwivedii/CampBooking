using CampBooking.Application.DTOs.Camp;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CampsController : ControllerBase
{
    private readonly ICampService _campService;

    public CampsController(ICampService campService)
    {
        _campService = campService;
    }

    // ==========================================
    // GET ALL CAMPS
    // ==========================================

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var camps = await _campService.GetAllAsync();

        return Ok(camps);
    }

    // ==========================================
    // SEARCH CAMPS
    // ==========================================

    [AllowAnonymous]
    [HttpGet("search")]
    public async Task<IActionResult> Search(
        [FromQuery] SearchCampDto dto)
    {
        var camps =
            await _campService.SearchAsync(dto);

        return Ok(camps);
    }

    // ==========================================
    // GET CAMP BY ID
    // ==========================================

    [AllowAnonymous]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var camp = await _campService.GetByIdAsync(id);

        if (camp == null)
            return NotFound("Camp not found.");

        return Ok(camp);
    }

    // ==========================================
    // CREATE CAMP
    // ==========================================

  [Authorize(Roles = Roles.Admin)]
[HttpPost]
[Consumes("multipart/form-data")]
public async Task<IActionResult> Create(
    [FromForm] CreateCampDto dto)
{
    await _campService.CreateAsync(dto);

    return Created(
        string.Empty,
        "Camp created successfully.");
}

    // ==========================================
    // UPDATE CAMP
    // ==========================================

[Authorize(Roles = Roles.Admin)]
[HttpPut("{id:guid}")]
[Consumes("multipart/form-data")]
public async Task<IActionResult> Update(
    Guid id,
    [FromForm] UpdateCampDto dto)
{
    await _campService.UpdateAsync(id, dto);

    return Ok("Camp updated successfully.");
}

    // ==========================================
    // DELETE CAMP
    // ==========================================

    [Authorize(Roles = Roles.Admin)]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _campService.DeleteAsync(id);

        return Ok("Camp deleted successfully.");
    }
}