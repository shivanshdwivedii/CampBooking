using CampBooking.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CampBooking.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Camp> Camps => Set<Camp>();

    public DbSet<Booking> Bookings => Set<Booking>();

    public DbSet<Rating> Ratings => Set<Rating>();

protected override void OnModelCreating(ModelBuilder builder)
{
    base.OnModelCreating(builder);

    builder.Entity<Camp>()
        .Property(c => c.PricePerNight)
        .HasPrecision(18, 2);

    builder.Entity<Camp>()
        .Property(c => c.AverageRating)
        .HasPrecision(3, 2);

    // Store amenities JSON string
    builder.Entity<Camp>()
        .Property(c => c.Amenities)
        .HasColumnType("text");

    builder.Entity<Booking>()
        .Property(b => b.TotalAmount)
        .HasPrecision(18, 2);

    builder.Entity<Booking>()
        .HasOne(b => b.Camp)
        .WithMany(c => c.Bookings)
        .HasForeignKey(b => b.CampId)
        .OnDelete(DeleteBehavior.Restrict);

    builder.Entity<Rating>()
        .HasOne(r => r.Camp)
        .WithMany(c => c.Ratings)
        .HasForeignKey(r => r.CampId)
        .OnDelete(DeleteBehavior.Cascade);

    builder.Entity<Rating>()
        .HasOne(r => r.Booking)
        .WithOne(b => b.Rating)
        .HasForeignKey<Rating>(r => r.BookingId);
}
}