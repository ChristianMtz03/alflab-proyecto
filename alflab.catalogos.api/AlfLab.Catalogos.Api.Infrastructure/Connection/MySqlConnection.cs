using MySql.Data.MySqlClient;
using System.Data;

namespace AlfLab.Catalogos.Api.Infrastructure.Connection;

public class DbConnection
{
    private readonly string _connectionString;

    public DbConnection(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IDbConnection CreateConnection()
    {
        return new MySqlConnection(_connectionString);
    }
}