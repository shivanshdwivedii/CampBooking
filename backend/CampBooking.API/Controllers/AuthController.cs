using CampBooking.Application.DTOs.Auth;
using CampBooking.Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampBooking.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] RegisterRequestDto request)
    {
        await _authService.RegisterAsync(request);

        return StatusCode(
            StatusCodes.Status201Created,
            "User registered successfully");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginRequestDto request)
    {
        var result = await _authService.LoginAsync(request);

        return Ok(result);
    }
}