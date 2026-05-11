using Microsoft.AspNetCore.Http;
namespace AlfLab.Catalogos.Api.Presentation.Middlewares;

public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;

    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        context.Response.Headers["X-Content-Type-Options"]    = "nosniff";
        context.Response.Headers["X-Frame-Options"]           = "DENY";
        context.Response.Headers["X-XSS-Protection"]         = "1; mode=block";
        context.Response.Headers["Referrer-Policy"]           = "no-referrer";
        context.Response.Headers["Content-Security-Policy"]   = "default-src 'self'";
        context.Response.Headers["Permissions-Policy"]        = "geolocation=(), microphone=(), camera=()";

        await _next(context);
    }
}