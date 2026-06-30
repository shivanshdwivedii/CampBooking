using CampBooking.Domain.Enums;
using FluentValidation;

namespace CampBooking.Application.Validators;

public class UpdateBookingStatusValidator
    : AbstractValidator<BookingStatus>
{
    public UpdateBookingStatusValidator()
    {
        RuleFor(x => x)
            .IsInEnum()
            .WithMessage("Invalid booking status.");
    }
}