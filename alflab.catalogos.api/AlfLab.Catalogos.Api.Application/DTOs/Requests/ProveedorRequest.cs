namespace AlfLab.Catalogos.Api.Application.DTOs.Requests;

public class ProveedorRequest
{
    public string NombreProveedor { get; set; } = string.Empty;
    public string? NombreEmpresa { get; set; }
    public string? Telefono { get; set; }
    public string? Email { get; set; }
    public string? RFC { get; set; }
    public string? Direccion { get; set; }
}