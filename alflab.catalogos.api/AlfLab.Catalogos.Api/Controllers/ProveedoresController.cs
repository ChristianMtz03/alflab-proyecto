using AlfLab.Catalogos.Api.Application.DTOs.Requests;
using AlfLab.Catalogos.Api.Application.UseCases.Proveedores;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AlfLab.Catalogos.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProveedoresController : ControllerBase
{
    private readonly GetAllProveedoresUseCase _getAllUseCase;
    private readonly GetProveedorByIdUseCase  _getByIdUseCase;
    private readonly CreateProveedorUseCase   _createUseCase;
    private readonly UpdateProveedorUseCase   _updateUseCase;
    private readonly DeleteProveedorUseCase   _deleteUseCase;
    private readonly IValidator<ProveedorRequest> _validator;

    public ProveedoresController(
        GetAllProveedoresUseCase getAllUseCase,
        GetProveedorByIdUseCase  getByIdUseCase,
        CreateProveedorUseCase   createUseCase,
        UpdateProveedorUseCase   updateUseCase,
        DeleteProveedorUseCase   deleteUseCase,
        IValidator<ProveedorRequest> validator)
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
        var proveedores = await _getAllUseCase.ExecuteAsync();
        return Ok(proveedores);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var proveedor = await _getByIdUseCase.ExecuteAsync(id);

        if (proveedor is null)
            return NotFound(new { message = $"Proveedor con ID {id} no encontrado." });

        return Ok(proveedor);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProveedorRequest request)
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
    public async Task<IActionResult> Update(int id, [FromBody] ProveedorRequest request)
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
            return NotFound(new { message = $"Proveedor con ID {id} no encontrado." });

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _deleteUseCase.ExecuteAsync(id);

        if (!deleted)
            return NotFound(new { message = $"Proveedor con ID {id} no encontrado." });

        return NoContent();
    }
}