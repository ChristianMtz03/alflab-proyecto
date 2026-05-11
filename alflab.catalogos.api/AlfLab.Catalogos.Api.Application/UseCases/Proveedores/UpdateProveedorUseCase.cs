using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Domain.Entities;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Proveedores;

public class UpdateProveedorUseCase
{
    private readonly IProveedorRepository _repository;

    public UpdateProveedorUseCase(IProveedorRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> ExecuteAsync(int id, ProveedorRequest request)
    {
        var proveedor = new Proveedor
        {
            IdProveedor     = id,
            NombreProveedor = request.NombreProveedor,
            NombreEmpresa   = request.NombreEmpresa,
            Telefono        = request.Telefono,
            Email           = request.Email,
            RFC             = request.RFC,
            Direccion       = request.Direccion
        };

        return await _repository.UpdateAsync(proveedor);
    }
}