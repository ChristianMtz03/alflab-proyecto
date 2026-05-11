namespace AlfLab.Catalogos.Api.Application.DTOs.Responses;

public class ClienteResponse
{
    public int IdCliente { get; set; }
    public string NombreCliente { get; set; } = string.Empty;
    public string? Empresa { get; set; }
    public string? Telefono { get; set; }
    public string? Email { get; set; }
    public string? Direccion { get; set; }
}