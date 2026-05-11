using System.Text;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;

namespace AlfLab.Catalogos.Api.Presentation.Middlewares;

public class InputSanitizationMiddleware
{
    private readonly RequestDelegate _next;

    private static readonly string[] _dangerousPatterns =
    [
        @"<script[^>]*>.*?</script>",
        @"javascript\s*:",
        @"on\w+\s*=",
        @"<\s*iframe",
        @"<\s*object",
        @"<\s*embed",
        @"eval\s*\(",
        @"expression\s*\("
    ];

    public InputSanitizationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.ContentLength > 0 &&
            context.Request.ContentType?.Contains("application/json") == true)
        {
            context.Request.EnableBuffering();

            using var reader = new StreamReader(
                context.Request.Body,
                Encoding.UTF8,
                leaveOpen: true);

            var body = await reader.ReadToEndAsync();

            if (ContienePeligroso(body))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(new
                {
                    message = "La petición contiene contenido no permitido."
                });
                return;
            }

            context.Request.Body.Position = 0;
        }

        await _next(context);
    }

    private static bool ContienePeligroso(string input)
    {
        return _dangerousPatterns.Any(pattern =>
            Regex.IsMatch(input, pattern,
                RegexOptions.IgnoreCase | RegexOptions.Singleline));
    }
}