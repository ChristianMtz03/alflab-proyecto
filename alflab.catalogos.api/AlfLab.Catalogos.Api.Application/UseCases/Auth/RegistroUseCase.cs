using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Domain.Entities;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Auth;

public class RegistroUseCase
{
    private readonly IUsuarioRepository _repository;

    public RegistroUseCase(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    public async Task<(bool Success, string Message)> ExecuteAsync(RegistroRequest request)
    {
        var emailExiste = await _repository.ExisteEmailAsync(request.Email);

        if (emailExiste)
            return (false, "El email ya está registrado.");

        var usuario = new Usuario
        {
            NombreUsuario = request.NombreUsuario,
            Email         = request.Email,
            PasswordHash  = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Rol           = request.Rol,
            Activo        = true
        };

        await _repository.CreateAsync(usuario);
        return (true, "Usuario registrado correctamente.");
    }
}