using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Application.UseCases.Auth;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace AlfLab.Catalogos.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly RegistroUseCase _registroUseCase;
    private readonly LoginUseCase    _loginUseCase;
    private readonly IValidator<RegistroRequest> _registroValidator;
    private readonly IValidator<LoginRequest>    _loginValidator;

    public AuthController(
        RegistroUseCase registroUseCase,
        LoginUseCase    loginUseCase,
        IValidator<RegistroRequest> registroValidator,
        IValidator<LoginRequest>    loginValidator)
    {
        _registroUseCase   = registroUseCase;
        _loginUseCase      = loginUseCase;
        _registroValidator = registroValidator;
        _loginValidator    = loginValidator;
    }

    [HttpPost("registro")]
    public async Task<IActionResult> Registro([FromBody] RegistroRequest request)
    {
        var validation = await _registroValidator.ValidateAsync(request);

        if (!validation.IsValid)
            return BadRequest(validation.Errors.Select(e => new
            {
                campo   = e.PropertyName,
                mensaje = e.ErrorMessage
            }));

        var (success, message) = await _registroUseCase.ExecuteAsync(request);

        if (!success)
            return BadRequest(new { message });

        return Ok(new { message });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var validation = await _loginValidator.ValidateAsync(request);

        if (!validation.IsValid)
            return BadRequest(validation.Errors.Select(e => new
            {
                campo   = e.PropertyName,
                mensaje = e.ErrorMessage
            }));

        var (success, message, data) = await _loginUseCase.ExecuteAsync(request);

        if (!success)
            return Unauthorized(new { message });

        return Ok(data);
    }
}