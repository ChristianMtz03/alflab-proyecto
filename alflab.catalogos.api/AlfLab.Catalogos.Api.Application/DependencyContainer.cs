using AlfLab.Catalogos.Api.Application.UseCases.Auth;
using AlfLab.Catalogos.Api.Application.UseCases.Clientes;
using AlfLab.Catalogos.Api.Application.UseCases.Proveedores;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;

namespace AlfLab.Catalogos.Api.Application;

public static class DependencyContainer
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddValidatorsFromAssemblyContaining<Validators.ClienteRequestValidator>();

        services.AddScoped<GetAllClientesUseCase>();
        services.AddScoped<GetClienteByIdUseCase>();
        services.AddScoped<CreateClienteUseCase>();
        services.AddScoped<UpdateClienteUseCase>();
        services.AddScoped<DeleteClienteUseCase>();

        services.AddScoped<GetAllProveedoresUseCase>();
        services.AddScoped<GetProveedorByIdUseCase>();
        services.AddScoped<CreateProveedorUseCase>();
        services.AddScoped<UpdateProveedorUseCase>();
        services.AddScoped<DeleteProveedorUseCase>();

        services.AddScoped<RegistroUseCase>();
        services.AddScoped<LoginUseCase>();

        return services;
    }
}