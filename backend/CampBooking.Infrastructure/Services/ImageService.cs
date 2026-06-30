using CampBooking.Application.Interfaces.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace CampBooking.Infrastructure.Services;

public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _environment;

    public ImageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<string?> SaveImageAsync(IFormFile? image)
    {
        if (image == null || image.Length == 0)
            return null;

        var uploadsFolder =
            Path.Combine(
                _environment.WebRootPath,
                "uploads");

        if (!Directory.Exists(uploadsFolder))
            Directory.CreateDirectory(uploadsFolder);

        var fileName =
            $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";

        var filePath =
            Path.Combine(
                uploadsFolder,
                fileName);

        using var stream =
            new FileStream(
                filePath,
                FileMode.Create);

        await image.CopyToAsync(stream);

        return $"uploads/{fileName}";
    }
}