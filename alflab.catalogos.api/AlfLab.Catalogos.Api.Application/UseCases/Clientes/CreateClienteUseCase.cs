using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Domain.Entities;
using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Clientes;

public class CreateClienteUseCase
{
    private readonly IClienteRepository _repository;

    public CreateClienteUseCase(IClienteRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> ExecuteAsync(ClienteRequest request)
    {
        var cliente = new Cliente
        {
            NombreCliente = request.NombreCliente,
            Empresa       = request.Empresa,
            Telefono      = request.Telefono,
            Email         = request.Email,
            Direccion     = request.Direccion
        };

        return await _repository.CreateAsync(cliente);
    }
}