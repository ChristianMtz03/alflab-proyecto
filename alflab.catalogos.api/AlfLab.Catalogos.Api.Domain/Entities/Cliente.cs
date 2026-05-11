namespace AlfLab.Catalogos.Api.Domain.Entities;

public class Cliente
{
    public int IdCliente { get; set; }
    public string NombreCliente { get; set; } = string.Empty;
    public string? Empresa { get; set; }
    public string? Telefono { get; set; }
    public string? Email { get; set; }
    public string? Direccion { get; set; }
}