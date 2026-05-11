using AlfLab.Catalogos.Api.Domain.Entities;
using AlfLab.Catalogos.Api.Domain.Interfaces;
using AlfLab.Catalogos.Api.Infrastructure.Connection;
using Dapper;

namespace AlfLab.Catalogos.Api.Infrastructure.Repositories;

public class ClienteRepository : IClienteRepository
{
    private readonly DbConnection _dbConnection;

    public ClienteRepository(DbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<Cliente>> GetAllAsync()
    {
        const string sql = @"
            SELECT 
                Id_cliente      AS IdCliente,
                NombreCliente,
                Empresa,
                Telefono,
                Email,
                Direccion
            FROM clientes";

        using var connection = _dbConnection.CreateConnection();
        return await connection.QueryAsync<Cliente>(sql);
    }

    public async Task<Cliente?> GetByIdAsync(int id)
    {
        const string sql = @"
            SELECT 
                Id_cliente      AS IdCliente,
                NombreCliente,
                Empresa,
                Telefono,
                Email,
                Direccion
            FROM clientes
            WHERE Id_cliente = @Id";

        using var connection = _dbConnection.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<Cliente>(sql, new { Id = id });
    }

    public async Task<int> CreateAsync(Cliente cliente)
    {
        const string sql = @"
            INSERT INTO clientes (NombreCliente, Empresa, Telefono, Email, Direccion)
            VALUES (@NombreCliente, @Empresa, @Telefono, @Email, @Direccion);
            SELECT LAST_INSERT_ID();";

        using var connection = _dbConnection.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(sql, cliente);
    }

    public async Task<bool> UpdateAsync(Cliente cliente)
    {
        const string sql = @"
            UPDATE clientes SET
                NombreCliente = @NombreCliente,
                Empresa       = @Empresa,
                Telefono      = @Telefono,
                Email         = @Email,
                Direccion     = @Direccion
            WHERE Id_cliente = @IdCliente";

        using var connection = _dbConnection.CreateConnection();
        var rowsAffected = await connection.ExecuteAsync(sql, cliente);
        return rowsAffected > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        const string sql = "DELETE FROM clientes WHERE Id_cliente = @Id";

        using var connection = _dbConnection.CreateConnection();
        var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
        return rowsAffected > 0;
    }
}