using CampBooking.Application.DTOs.Auth;
using CampBooking.Application.Interfaces;
using CampBooking.Application.Interfaces.Services;
using CampBooking.Domain.Constants;
using CampBooking.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace CampBooking.Application.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtService _jwtService;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        IJwtService jwtService)
    {
        _userManager = userManager;
        _jwtService = jwtService;
    }

    public async Task RegisterAsync(RegisterRequestDto request)
    {
        var existingUser =
            await _userManager.FindByEmailAsync(request.Email);

        if (existingUser != null)
            throw new ApplicationException("User already exists");

        var user = new ApplicationUser
        {
            FullName = request.FullName,
            Email = request.Email,
            UserName = request.Email
        };

        var result =
            await _userManager.CreateAsync(
                user,
                request.Password);

        if (!result.Succeeded)
        {
            throw new ApplicationException(
                string.Join(", ",
                    result.Errors.Select(x => x.Description)));
        }

        await _userManager.AddToRoleAsync(
            user,
            Roles.User);
    }

    public async Task<LoginResponseDto> LoginAsync(
        LoginRequestDto request)
    {
        var user =
            await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
            throw new ApplicationException("Invalid credentials");

        var validPassword =
            await _userManager.CheckPasswordAsync(
                user,
                request.Password);

        if (!validPassword)
            throw new ApplicationException("Invalid credentials");

        var roles =
            await _userManager.GetRolesAsync(user);

        var token =
            _jwtService.GenerateToken(
                user.Id,
                user.Email!,
                roles);

return new LoginResponseDto
{
    Token = token,
    Email = user.Email!,
    FullName = user.FullName,
    Roles = roles.ToList()
};
    }
}