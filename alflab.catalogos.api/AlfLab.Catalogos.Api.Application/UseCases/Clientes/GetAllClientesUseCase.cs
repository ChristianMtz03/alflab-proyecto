using AlfLab.Catalogos.Api.Application.DTOs.Responses;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Clientes;

public class GetAllClientesUseCase
{
    private readonly IClienteRepository _repository;

    public GetAllClientesUseCase(IClienteRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ClienteResponse>> ExecuteAsync()
    {
        var clientes = await _repository.GetAllAsync();

        return clientes.Select(c => new ClienteResponse
        {
            IdCliente     = c.IdCliente,
            NombreCliente = c.NombreCliente,
            Empresa       = c.Empresa,
            Telefono      = c.Telefono,
            Email         = c.Email,
            Direccion     = c.Direccion
        });
    }
}