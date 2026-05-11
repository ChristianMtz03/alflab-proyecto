using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Clientes;

public class DeleteClienteUseCase
{
    private readonly IClienteRepository _repository;

    public DeleteClienteUseCase(IClienteRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> ExecuteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}