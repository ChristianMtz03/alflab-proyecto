using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using FluentValidation;

namespace AlfLab.Catalogos.Api.Application.Validators;

public class RegistroRequestValidator : AbstractValidator<RegistroRequest>
{
    public RegistroRequestValidator()
    {
        RuleFor(x => x.NombreUsuario)
            .NotEmpty()
                .WithMessage("El nombre de usuario es obligatorio.")
            .MaximumLength(100)
                .WithMessage("El nombre no puede exceder 100 caracteres.");

        RuleFor(x => x.Email)
            .NotEmpty()
                .WithMessage("El email es obligatorio.")
            .EmailAddress()
                .WithMessage("El formato del email no es válido.")
            .MaximumLength(150)
                .WithMessage("El email no puede exceder 150 caracteres.");

        RuleFor(x => x.Password)
            .NotEmpty()
                .WithMessage("La contraseña es obligatoria.")
            .MinimumLength(8)
                .WithMessage("La contraseña debe tener al menos 8 caracteres.")
            .Matches(@"[A-Z]")
                .WithMessage("La contraseña debe contener al menos una mayúscula.")
            .Matches(@"[a-z]")
                .WithMessage("La contraseña debe contener al menos una minúscula.")
            .Matches(@"\d")
                .WithMessage("La contraseña debe contener al menos un número.")
            .Matches(@"[^a-zA-Z\d]")
                .WithMessage("La contraseña debe contener al menos un carácter especial.");

        RuleFor(x => x.Rol)
            .NotEmpty()
                .WithMessage("El rol es obligatorio.")
            .Must(r => r == "Administrador" || r == "Empleado")
                .WithMessage("El rol debe ser Administrador o Empleado.");
    }
}