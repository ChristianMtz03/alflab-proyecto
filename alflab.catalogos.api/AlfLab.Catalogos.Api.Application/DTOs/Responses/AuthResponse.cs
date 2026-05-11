namespace AlfLab.Catalogos.Api.Application.DTOs.Responses;

public class AuthResponse
{
    public string Token { get; set; } = string.Empty;
    public string NombreUsuario { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Rol { get; set; } = string.Empty;
    public DateTime Expiracion { get; set; }
}