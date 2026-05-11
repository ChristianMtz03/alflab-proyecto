using AlfLab.Catalogos.Api.Domain.Entities;

namespace AlfLab.Catalogos.Api.Domain.Interfaces;

public interface IProveedorRepository
{
    Task<IEnumerable<Proveedor>> GetAllAsync();
    Task<Proveedor?> GetByIdAsync(int id);
    Task<int> CreateAsync(Proveedor proveedor);
    Task<bool> UpdateAsync(Proveedor proveedor);
    Task<bool> DeleteAsync(int id);
}