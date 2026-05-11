using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using AlfLab.Catalogos.Api.Test.Config;
using Xunit;

namespace AlfLab.Catalogos.Api.Test;

public class ProveedoresControllerTest
    : IClassFixture<AlfLabCatalogosWebApplication<Program>>
{
    private readonly AlfLabCatalogosWebApplication<Program> _factory;

    public ProveedoresControllerTest(
        AlfLabCatalogosWebApplication<Program> factory)
    {
        _factory = factory;
    }

    private HttpClient CreateClient() => _factory.CreateClient();

    private async Task<HttpClient> GetAuthenticatedClient()
    {
        var client  = _factory.CreateClient();
        var request = new
        {
            email    = "admin@alflab.mx",
            password = "Admin123!"
        };

        var response = await client.PostAsJsonAsync("api/Auth/login", request);

        if (response.IsSuccessStatusCode)
        {
            var content  = await response.Content.ReadAsStringAsync();
            var json     = JsonSerializer.Deserialize<JsonElement>(content);
            var token    = json.GetProperty("token").GetString() ?? string.Empty;
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }

        return client;
    }

    [Fact]
    public async Task GetAll_SinToken_ReturnsUnauthorized()
    {
        //Arrange
        var client = CreateClient();

        //Act
        var response = await client.GetAsync("api/Proveedores");

        //Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetAll_Ok()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        //Act
        var response  = await client.GetAsync("api/Proveedores");
        var content   = await response.Content.ReadAsStringAsync();
        var elementos = JsonSerializer.Deserialize<JsonElement>(content);

        //Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(elementos.ValueKind != JsonValueKind.Null);
    }

    [Fact]
    public async Task GetById_Ok()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        //Act
        var response = await client.GetAsync("api/Proveedores/1");

        //Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetById_NoExiste_ReturnsNotFound()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        //Act
        var response = await client.GetAsync("api/Proveedores/99999");

        //Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Create_Ok()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        var request = new
        {
            nombreProveedor = "Proveedor Prueba Test",
            nombreEmpresa   = "Empresa Prueba S.A.",
            telefono        = "5512345678",
            email           = "proveedor.prueba@test.com",
            rfc             = "PPR900101AB1",
            direccion       = "Calle Industrial 789, CDMX"
        };

        //Act
        var response = await client.PostAsJsonAsync("api/Proveedores", request);

        //Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Theory]
    [InlineData("", "Empresa", "5512345678", "test@test.com", null, "CDMX")]
    [InlineData("Proveedor", "Empresa", "5512345678", "correo-invalido", null, "CDMX")]
    [InlineData("Proveedor", "Empresa", "5512345678", "test@test.com", "RFC_MAL", "CDMX")]
    public async Task Create_DatosInvalidos_ReturnsBadRequest(
        string nombre, string empresa, string telefono,
        string email, string? rfc, string direccion)
    {
        //Arrange
        var client  = await GetAuthenticatedClient();
        var request = new
        {
            nombreProveedor = nombre,
            nombreEmpresa   = empresa,
            telefono,
            email,
            rfc,
            direccion
        };

        //Act
        var response = await client.PostAsJsonAsync("api/Proveedores", request);

        //Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Update_Ok()
    {
        //Arrange
        var client  = await GetAuthenticatedClient();
        var request = new
        {
            nombreProveedor = "Proveedor Actualizado",
            nombreEmpresa   = "Empresa Actualizada S.A.",
            telefono        = "5598765432",
            email           = "actualizado@proveedor.com",
            rfc             = "PAC900101XY2",
            direccion       = "Nueva Dirección Industrial 456"
        };

        //Act
        var response = await client.PutAsJsonAsync("api/Proveedores/1", request);

        //Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task Update_NoExiste_ReturnsNotFound()
    {
        //Arrange
        var client  = await GetAuthenticatedClient();
        var request = new
        {
            nombreProveedor = "Fantasma",
            nombreEmpresa   = "Empresa",
            telefono        = "5512345678",
            email           = "fantasma@test.com",
            rfc             = (string?)null,
            direccion       = "Dirección"
        };

        //Act
        var response = await client.PutAsJsonAsync("api/Proveedores/99999", request);

        //Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Delete_Ok()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        var nuevoProveedor = new
        {
            nombreProveedor = "Proveedor Para Eliminar",
            nombreEmpresa   = "Empresa Test S.A.",
            telefono        = "5512345678",
            email           = "eliminar@proveedor.com",
            rfc             = "PEL900101AB1",
            direccion       = "Calle Industrial 789"
        };
        var postResponse = await client.PostAsJsonAsync("api/Proveedores", nuevoProveedor);
        var postContent  = await postResponse.Content.ReadAsStringAsync();
        var postJson     = JsonSerializer.Deserialize<JsonElement>(postContent);
        var id           = postJson.GetProperty("id").GetInt32();

        //Act
        var response = await client.DeleteAsync($"api/Proveedores/{id}");

        //Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task Delete_NoExiste_ReturnsNotFound()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        //Act
        var response = await client.DeleteAsync("api/Proveedores/99999");

        //Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}