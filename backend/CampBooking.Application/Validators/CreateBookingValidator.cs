using CampBooking.Application.DTOs.Booking;
using FluentValidation;

namespace CampBooking.Application.Validators;

public class CreateBookingValidator : AbstractValidator<CreateBookingDto>
{
    public CreateBookingValidator()
    {
        RuleFor(x => x.CampId)
            .NotEmpty();

        RuleFor(x => x.CheckInDate)
            .GreaterThanOrEqualTo(DateTime.Today);

        RuleFor(x => x.CheckOutDate)
            .GreaterThan(x => x.CheckInDate);

        RuleFor(x => x.BillingAddress)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.PhoneNumber)
            .NotEmpty()
            .Matches(@"^\d{10}$")
            .WithMessage("Phone number must contain exactly 10 digits.");
    }
}