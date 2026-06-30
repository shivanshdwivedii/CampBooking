using Microsoft.AspNetCore.Http;

namespace CampBooking.Application.Interfaces.Services;

public interface IImageService
{
    Task<string?> SaveImageAsync(IFormFile? image);
}