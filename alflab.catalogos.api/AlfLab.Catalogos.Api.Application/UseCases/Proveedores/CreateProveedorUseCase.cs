using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Domain.Entities;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Proveedores;

public class CreateProveedorUseCase
{
    private readonly IProveedorRepository _repository;

    public CreateProveedorUseCase(IProveedorRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> ExecuteAsync(ProveedorRequest request)
    {
        var proveedor = new Proveedor
        {
            NombreProveedor = request.NombreProveedor,
            NombreEmpresa   = request.NombreEmpresa,
            Telefono        = request.Telefono,
            Email           = request.Email,
            RFC             = request.RFC,
            Direccion       = request.Direccion
        };

        return await _repository.CreateAsync(proveedor);
    }
}