using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Domain.Entities;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Clientes;

public class UpdateClienteUseCase
{
    private readonly IClienteRepository _repository;

    public UpdateClienteUseCase(IClienteRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> ExecuteAsync(int id, ClienteRequest request)
    {
        var cliente = new Cliente
        {
            IdCliente     = id,
            NombreCliente = request.NombreCliente,
            Empresa       = request.Empresa,
            Telefono      = request.Telefono,
            Email         = request.Email,
            Direccion     = request.Direccion
        };

        return await _repository.UpdateAsync(cliente);
    }
}