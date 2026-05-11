using AlfLab.Catalogos.Api.Domain.Entities;
using AlfLab.Catalogos.Api.Domain.Interfaces;
using AlfLab.Catalogos.Api.Infrastructure.Connection;
using Dapper;

namespace AlfLab.Catalogos.Api.Infrastructure.Repositories;

public class ProveedorRepository : IProveedorRepository
{
    private readonly DbConnection _dbConnection;

    public ProveedorRepository(DbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<Proveedor>> GetAllAsync()
    {
        const string sql = @"
            SELECT
                Id_proveedor    AS IdProveedor,
                NombreProveedor,
                NombreEmpresa,
                Telefono,
                Email,
                RFC,
                Direccion
            FROM proveedores";

        using var connection = _dbConnection.CreateConnection();
        return await connection.QueryAsync<Proveedor>(sql);
    }

    public async Task<Proveedor?> GetByIdAsync(int id)
    {
        const string sql = @"
            SELECT
                Id_proveedor    AS IdProveedor,
                NombreProveedor,
                NombreEmpresa,
                Telefono,
                Email,
                RFC,
                Direccion
            FROM proveedores
            WHERE Id_proveedor = @Id";

        using var connection = _dbConnection.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<Proveedor>(sql, new { Id = id });
    }

    public async Task<int> CreateAsync(Proveedor proveedor)
    {
        const string sql = @"
            INSERT INTO proveedores
                (NombreProveedor, NombreEmpresa, Telefono, Email, RFC, Direccion)
            VALUES
                (@NombreProveedor, @NombreEmpresa, @Telefono, @Email, @RFC, @Direccion);
            SELECT LAST_INSERT_ID();";

        using var connection = _dbConnection.CreateConnection();
        return await connection.ExecuteScalarAsync<int>(sql, proveedor);
    }

    public async Task<bool> UpdateAsync(Proveedor proveedor)
    {
        const string sql = @"
            UPDATE proveedores SET
                NombreProveedor = @NombreProveedor,
                NombreEmpresa   = @NombreEmpresa,
                Telefono        = @Telefono,
                Email           = @Email,
                RFC             = @RFC,
                Direccion       = @Direccion
            WHERE Id_proveedor = @IdProveedor";

        using var connection = _dbConnection.CreateConnection();
        var rowsAffected = await connection.ExecuteAsync(sql, proveedor);
        return rowsAffected > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        const string sql = "DELETE FROM proveedores WHERE Id_proveedor = @Id";

        using var connection = _dbConnection.CreateConnection();
        var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
        return rowsAffected > 0;
    }
}