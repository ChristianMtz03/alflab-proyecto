using AspNetCoreRateLimit;
using Microsoft.Extensions.DependencyInjection;

namespace AlfLab.Catalogos.Api.Presentation.Helpers;

public static class RateLimitingHelper
{
    public static IServiceCollection AddRateLimitingConfig(
        this IServiceCollection services)
    {
        services.AddMemoryCache();
        services.AddInMemoryRateLimiting();

        services.Configure<IpRateLimitOptions>(options =>
        {
            options.EnableEndpointRateLimiting = true;
            options.StackBlockedRequests       = false;
            options.HttpStatusCode             = 429;
            options.RealIpHeader               = "X-Real-IP";
            options.GeneralRules               =
            [
                new RateLimitRule
                {
                    Endpoint = "*",
                    Period   = "1m",
                    Limit    = 60
                },
                new RateLimitRule
                {
                    Endpoint = "post:/api/Auth/login",
                    Period   = "5m",
                    Limit    = 5
                },
                new RateLimitRule
                {
                    Endpoint = "post:/api/Auth/registro",
                    Period   = "1h",
                    Limit    = 3
                }
            ];
        });

        services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

        return services;
    }
}