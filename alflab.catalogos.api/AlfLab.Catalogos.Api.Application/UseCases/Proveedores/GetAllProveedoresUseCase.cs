using AlfLab.Catalogos.Api.Application.DTOs.Responses;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Proveedores;

public class GetAllProveedoresUseCase
{
    private readonly IProveedorRepository _repository;

    public GetAllProveedoresUseCase(IProveedorRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProveedorResponse>> ExecuteAsync()
    {
        var proveedores = await _repository.GetAllAsync();

        return proveedores.Select(p => new ProveedorResponse
        {
            IdProveedor    = p.IdProveedor,
            NombreProveedor = p.NombreProveedor,
            NombreEmpresa  = p.NombreEmpresa,
            Telefono       = p.Telefono,
            Email          = p.Email,
            RFC            = p.RFC,
            Direccion      = p.Direccion
        });
    }
}