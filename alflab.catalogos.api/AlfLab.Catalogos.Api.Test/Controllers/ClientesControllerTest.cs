using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using AlfLab.Catalogos.Api.Test.Config;
using Xunit;

namespace AlfLab.Catalogos.Api.Test;

public class ClientesControllerTest
    : IClassFixture<AlfLabCatalogosWebApplication<Program>>
{
    private readonly AlfLabCatalogosWebApplication<Program> _factory;

    public ClientesControllerTest(
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
        var response = await client.GetAsync("api/Clientes");

        //Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetAll_Ok()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        //Act
        var response = await client.GetAsync("api/Clientes");
        var content  = await response.Content.ReadAsStringAsync();
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

        var nuevoCliente = new
        {
            nombreCliente = "Cliente Para GetById",
            empresa       = "Empresa Test",
            telefono      = "6181234567",
            email         = "getbyid@test.com",
            direccion     = "Calle Test 123"
        };
        var postResponse = await client.PostAsJsonAsync("api/Clientes", nuevoCliente);
        var postContent  = await postResponse.Content.ReadAsStringAsync();
        var postJson     = JsonSerializer.Deserialize<JsonElement>(postContent);
        var id           = postJson.GetProperty("id").GetInt32();

        //Act
        var response = await client.GetAsync($"api/Clientes/{id}");

        //Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task GetById_NoExiste_ReturnsNotFound()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        //Act
        var response = await client.GetAsync("api/Clientes/99999");

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
            nombreCliente = "Cliente Prueba Test",
            empresa       = "Empresa Test",
            telefono      = "6181234567",
            email         = "cliente.prueba@test.com",
            direccion     = "Calle Test 123, Durango"
        };

        //Act
        var response = await client.PostAsJsonAsync("api/Clientes", request);

        //Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    [Theory]
    [InlineData("", "Empresa", "6181234567", "test@test.com", "Durango")]
    [InlineData("Cliente", "Empresa", "6181234567", "correo-invalido", "Durango")]
    public async Task Create_DatosInvalidos_ReturnsBadRequest(
        string nombre, string empresa, string telefono,
        string email, string direccion)
    {
        //Arrange
        var client  = await GetAuthenticatedClient();
        var request = new { nombreCliente = nombre, empresa, telefono, email, direccion };

        //Act
        var response = await client.PostAsJsonAsync("api/Clientes", request);

        //Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Update_Ok()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        var nuevoCliente = new
        {
            nombreCliente = "Cliente Para Update",
            empresa       = "Empresa Test",
            telefono      = "6181234567",
            email         = "update@test.com",
            direccion     = "Calle Test 123"
        };
        var postResponse = await client.PostAsJsonAsync("api/Clientes", nuevoCliente);
        var postContent  = await postResponse.Content.ReadAsStringAsync();
        var postJson     = JsonSerializer.Deserialize<JsonElement>(postContent);
        var id           = postJson.GetProperty("id").GetInt32();

        var request = new
        {
            nombreCliente = "Cliente Actualizado",
            empresa       = "Empresa Actualizada",
            telefono      = "6189999999",
            email         = "actualizado@test.com",
            direccion     = "Nueva Dirección 456"
        };

        //Act
        var response = await client.PutAsJsonAsync($"api/Clientes/{id}", request);

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
            nombreCliente = "Cliente Fantasma",
            empresa       = "Empresa",
            telefono      = "6181234567",
            email         = "fantasma@test.com",
            direccion     = "Dirección"
        };

        //Act
        var response = await client.PutAsJsonAsync("api/Clientes/99999", request);

        //Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task Delete_Ok()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        var nuevoCliente = new
        {
            nombreCliente = "Cliente Para Eliminar",
            empresa       = "Empresa Test",
            telefono      = "6181234567",
            email         = "eliminar@test.com",
            direccion     = "Calle Test 123"
        };
        var postResponse = await client.PostAsJsonAsync("api/Clientes", nuevoCliente);
        var postContent  = await postResponse.Content.ReadAsStringAsync();
        var postJson     = JsonSerializer.Deserialize<JsonElement>(postContent);
        var id           = postJson.GetProperty("id").GetInt32();

        //Act
        var response = await client.DeleteAsync($"api/Clientes/{id}");

        //Assert
        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
    }

    [Fact]
    public async Task Delete_NoExiste_ReturnsNotFound()
    {
        //Arrange
        var client = await GetAuthenticatedClient();

        //Act
        var response = await client.DeleteAsync("api/Clientes/99999");

        //Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}