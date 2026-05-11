using AlfLab.Catalogos.Api.Domain.Entities;

namespace AlfLab.Catalogos.Api.Domain.Interfaces;

public interface IUsuarioRepository
{
    Task<Usuario?> GetByEmailAsync(string email);
    Task<bool> ExisteEmailAsync(string email);
    Task<int> CreateAsync(Usuario usuario);
}