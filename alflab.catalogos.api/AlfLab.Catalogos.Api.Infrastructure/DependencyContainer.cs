using AlfLab.Catalogos.Api.Domain.Interfaces;
using AlfLab.Catalogos.Api.Infrastructure.Connection;
using AlfLab.Catalogos.Api.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace AlfLab.Catalogos.Api.Infrastructure;

public static class DependencyContainer
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddSingleton(new DbConnection(connectionString));

        services.AddScoped<IClienteRepository, ClienteRepository>();
        services.AddScoped<IProveedorRepository, ProveedorRepository>();
        services.AddScoped<IUsuarioRepository, UsuarioRepository>();

        return services;
    }
}