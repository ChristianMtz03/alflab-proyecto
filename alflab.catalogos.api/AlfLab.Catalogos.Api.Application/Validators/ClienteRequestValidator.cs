using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using FluentValidation;

namespace AlfLab.Catalogos.Api.Application.Validators;

public class ClienteRequestValidator : AbstractValidator<ClienteRequest>
{
    public ClienteRequestValidator()
    {
        RuleFor(x => x.NombreCliente)
            .NotEmpty()
                .WithMessage("El nombre del cliente es obligatorio.")
            .MaximumLength(100)
                .WithMessage("El nombre no puede exceder 100 caracteres.");

        RuleFor(x => x.Empresa)
            .MaximumLength(150)
                .WithMessage("El nombre de empresa no puede exceder 150 caracteres.")
            .When(x => x.Empresa is not null);

        RuleFor(x => x.Telefono)
            .MaximumLength(20)
                .WithMessage("El teléfono no puede exceder 20 caracteres.")
            .Matches(@"^[\d\s\+\-\(\)]+$")
                .WithMessage("El teléfono solo puede contener números, espacios y los caracteres + - ( ).")
            .When(x => x.Telefono is not null);

        RuleFor(x => x.Email)
            .EmailAddress()
                .WithMessage("El formato del email no es válido.")
            .MaximumLength(150)
                .WithMessage("El email no puede exceder 150 caracteres.")
            .When(x => x.Email is not null);

        RuleFor(x => x.Direccion)
            .MaximumLength(250)
                .WithMessage("La dirección no puede exceder 250 caracteres.")
            .When(x => x.Direccion is not null);
    }
}