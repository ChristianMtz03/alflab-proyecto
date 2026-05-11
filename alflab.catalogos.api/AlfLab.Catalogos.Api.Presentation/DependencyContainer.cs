using AlfLab.Catalogos.Api.Presentation.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace AlfLab.Catalogos.Api.Presentation;

public static class DependencyContainer
{
    public static IServiceCollection AddPresentation(
        this IServiceCollection services)
    {
        services.AddRateLimitingConfig();
        return services;
    }
}