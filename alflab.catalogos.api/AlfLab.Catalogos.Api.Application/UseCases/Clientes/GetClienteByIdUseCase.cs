using AlfLab.Catalogos.Api.Application.DTOs.Responses;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Clientes;

public class GetClienteByIdUseCase
{
    private readonly IClienteRepository _repository;

    public GetClienteByIdUseCase(IClienteRepository repository)
    {
        _repository = repository;
    }

    public async Task<ClienteResponse?> ExecuteAsync(int id)
    {
        var cliente = await _repository.GetByIdAsync(id);

        if (cliente is null)
            return null;

        return new ClienteResponse
        {
            IdCliente     = cliente.IdCliente,
            NombreCliente = cliente.NombreCliente,
            Empresa       = cliente.Empresa,
            Telefono      = cliente.Telefono,
            Email         = cliente.Email,
            Direccion     = cliente.Direccion
        };
    }
}