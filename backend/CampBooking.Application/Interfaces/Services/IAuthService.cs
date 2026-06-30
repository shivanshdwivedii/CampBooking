using CampBooking.Application.DTOs.Auth;

namespace CampBooking.Application.Interfaces.Services;

public interface IAuthService
{
    Task RegisterAsync(RegisterRequestDto request);

    Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
}