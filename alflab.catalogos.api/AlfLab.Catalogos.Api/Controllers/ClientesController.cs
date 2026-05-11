using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Application.UseCases.Clientes;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AlfLab.Catalogos.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ClientesController : ControllerBase
{
    private readonly GetAllClientesUseCase _getAllUseCase;
    private readonly GetClienteByIdUseCase _getByIdUseCase;
    private readonly CreateClienteUseCase  _createUseCase;
    private readonly UpdateClienteUseCase  _updateUseCase;
    private readonly DeleteClienteUseCase  _deleteUseCase;
    private readonly IValidator<ClienteRequest> _validator;

    public ClientesController(
        GetAllClientesUseCase getAllUseCase,
        GetClienteByIdUseCase getByIdUseCase,
        CreateClienteUseCase  createUseCase,
        UpdateClienteUseCase  updateUseCase,
        DeleteClienteUseCase  deleteUseCase,
        IValidator<ClienteRequest> validator)
    {
        _getAllUseCase   = getAllUseCase;
        _getByIdUseCase = getByIdUseCase;
        _createUseCase  = createUseCase;
        _updateUseCase  = updateUseCase;
        _deleteUseCase  = deleteUseCase;
        _validator      = validator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clientes = await _getAllUseCase.ExecuteAsync();
        return Ok(clientes);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cliente = await _getByIdUseCase.ExecuteAsync(id);

        if (cliente is null)
            return NotFound(new { message = $"Cliente con ID {id} no encontrado." });

        return Ok(cliente);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ClienteRequest request)
    {
        var validation = await _validator.ValidateAsync(request);

        if (!validation.IsValid)
            return BadRequest(validation.Errors.Select(e => new
            {
                campo   = e.PropertyName,
                mensaje = e.ErrorMessage
            }));

        var newId = await _createUseCase.ExecuteAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = newId }, new { id = newId });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] ClienteRequest request)
    {
        var validation = await _validator.ValidateAsync(request);

        if (!validation.IsValid)
            return BadRequest(validation.Errors.Select(e => new
            {
                campo   = e.PropertyName,
                mensaje = e.ErrorMessage
            }));

        var updated = await _updateUseCase.ExecuteAsync(id, request);

        if (!updated)
            return NotFound(new { message = $"Cliente con ID {id} no encontrado." });

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _deleteUseCase.ExecuteAsync(id);

        if (!deleted)
            return NotFound(new { message = $"Cliente con ID {id} no encontrado." });

        return NoContent();
    }
}