using AlfLab.Catalogos.Api.Application;
using AlfLab.Catalogos.Api.Presentation;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace AlfLab.Catalogos.Api.Test.Config;

public class AlfLabCatalogosWebApplication<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            services.AddApplication();

            services.PostConfigure<IpRateLimitOptions>(options =>
            {
                options.GeneralRules = [];
            });
        });
    }
}