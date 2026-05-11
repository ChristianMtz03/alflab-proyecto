using AlfLab.Catalogos.Api.Application.DTOs.Responses;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Proveedores;

public class GetProveedorByIdUseCase
{
    private readonly IProveedorRepository _repository;

    public GetProveedorByIdUseCase(IProveedorRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProveedorResponse?> ExecuteAsync(int id)
    {
        var proveedor = await _repository.GetByIdAsync(id);

        if (proveedor is null)
            return null;

        return new ProveedorResponse
        {
            IdProveedor     = proveedor.IdProveedor,
            NombreProveedor = proveedor.NombreProveedor,
            NombreEmpresa   = proveedor.NombreEmpresa,
            Telefono        = proveedor.Telefono,
            Email           = proveedor.Email,
            RFC             = proveedor.RFC,
            Direccion       = proveedor.Direccion
        };
    }
}