using AlfLab.Catalogos.Api.Domain.Entities;
using AlfLab.Catalogos.Api.Domain.Interfaces;
using AlfLab.Catalogos.Api.Infrastructure.Connection;
using Dapper;

namespace AlfLab.Catalogos.Api.Infrastructure.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly DbConnection _dbConnection;

    public UsuarioRepository(DbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<Usuario?> GetByEmailAsync(string email)
    {
        const string sql = @"
            SELECT
                Id_usuario   AS IdUsuario,
                NombreUsuario,
                Email,
                PasswordHash,
                Rol,
                Activo
            FROM usuarios
            WHERE Email = @Email";

        using var connection = _dbConnection.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<Usuario>(sql, new { Email = email });
    }

    public async Task<bool> ExisteEmailAsync(string email)
    {
        const string sql = @"
            SELECT COUNT(1)
            FROM usuarios
            WHERE Email = @Email";

        using var connection = _dbConnection.CreateConnection();
        var count = await connection.ExecuteScalarAsync<int>(sql, new { Email = email });
        return count > 0;
    }

    public async Task<int> CreateAsync(Usuario usuario)
    {
        const string sql = @"
            INSERT INTO usuarios
                (NombreUsuario, Email, PasswordHash, Rol, Activo)
            VALUES
                (@NombreUsuario, @Email, @PasswordHash, @Rol, @Activo);
            SELECT LAST_INSERT_ID();";

        using var connection = _dbConnection.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(sql, usuario);
    }
}