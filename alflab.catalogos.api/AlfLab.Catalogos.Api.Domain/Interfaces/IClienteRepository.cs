using AlfLab.Catalogos.Api.Domain.Entities;

namespace AlfLab.Catalogos.Api.Domain.Interfaces;

public interface IClienteRepository
{
    Task<IEnumerable<Cliente>> GetAllAsync();
    Task<Cliente?> GetByIdAsync(int id);
    Task<int> CreateAsync(Cliente cliente);
    Task<bool> UpdateAsync(Cliente cliente);
    Task<bool> DeleteAsync(int id);
}