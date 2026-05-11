using AlfLab.Catalogos.Api.Domain.Interfaces;

namespace AlfLab.Catalogos.Api.Application.UseCases.Proveedores;

public class DeleteProveedorUseCase
{
    private readonly IProveedorRepository _repository;

    public DeleteProveedorUseCase(IProveedorRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> ExecuteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}