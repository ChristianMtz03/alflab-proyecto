using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Application.DTOs.Responses;
using AlfLab.Catalogos.Api.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AlfLab.Catalogos.Api.Application.UseCases.Auth;

public class LoginUseCase
{
    private readonly IUsuarioRepository _repository;
    private readonly IConfiguration _configuration;

    public LoginUseCase(IUsuarioRepository repository, IConfiguration configuration)
    {
        _repository    = repository;
        _configuration = configuration;
    }

    public async Task<(bool Success, string Message, AuthResponse? Data)> ExecuteAsync(LoginRequest request)
    {
        var usuario = await _repository.GetByEmailAsync(request.Email);

        if (usuario is null || !usuario.Activo)
            return (false, "Credenciales inválidas.", null);

        var passwordValido = BCrypt.Net.BCrypt.Verify(request.Password, usuario.PasswordHash);

        if (!passwordValido)
            return (false, "Credenciales inválidas.", null);

        var token = GenerarToken(usuario);
        return (true, "Login exitoso.", token);
    }

    private AuthResponse GenerarToken(Domain.Entities.Usuario usuario)
    {
        var jwtSettings  = _configuration.GetSection("JwtSettings");
        var secretKey    = jwtSettings["SecretKey"]!;
        var expiracion = DateTime.UtcNow.AddMinutes(
            int.Parse(jwtSettings["ExpirationMinutes"]!));

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
            new Claim(ClaimTypes.Name,           usuario.NombreUsuario),
            new Claim(ClaimTypes.Email,          usuario.Email),
            new Claim(ClaimTypes.Role,           usuario.Rol)
        };

        var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var jwtToken = new JwtSecurityToken(
            issuer:   jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims:   claims,
            expires:  expiracion,
            signingCredentials: creds
        );

        return new AuthResponse
        {
            Token         = new JwtSecurityTokenHandler().WriteToken(jwtToken),
            NombreUsuario = usuario.NombreUsuario,
            Email         = usuario.Email,
            Rol           = usuario.Rol,
            Expiracion    = expiracion
        };
    }
}