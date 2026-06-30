using CampBooking.Application.DTOs.Auth;
using FluentValidation;

namespace CampBooking.Application.Validators;

public class RegisterValidator : AbstractValidator<RegisterRequestDto>
{
    public RegisterValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(5)
            .Matches(@"[!@#$%^&*(),.?""{}|<>]")
            .WithMessage("Password must contain at least one special character.");
    }
}