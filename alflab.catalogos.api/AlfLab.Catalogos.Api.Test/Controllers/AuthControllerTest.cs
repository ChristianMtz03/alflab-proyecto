using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using AlfLab.Catalogos.Api.Test.Config;
using Xunit;

namespace AlfLab.Catalogos.Api.Test;

public class AuthControllerTest
    : IClassFixture<AlfLabCatalogosWebApplication<Program>>
{
    private readonly HttpClient _http;

    public AuthControllerTest(
        AlfLabCatalogosWebApplication<Program> factory)
    {
        _http = factory.CreateClient();
    }

    [Fact]
    public async Task Registro_Ok()
    {
        //Arrange
        var request = new
        {
            nombreUsuario = "Usuario Test",
            email         = $"test_{Guid.NewGuid()}@alflab.mx",
            password      = "Test123!",
            rol           = "Empleado"
        };

        //Act
        var response = await _http.PostAsJsonAsync("api/Auth/registro", request);

        //Assert
        Assert.True(response.IsSuccessStatusCode);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Registro_EmailDuplicado_ReturnsBadRequest()
    {
        //Arrange
        var request = new
        {
            nombreUsuario = "Admin AlfLab",
            email         = "admin@alflab.mx",
            password      = "Admin123!",
            rol           = "Administrador"
        };

        //Act
        var response = await _http.PostAsJsonAsync("api/Auth/registro", request);

        //Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Theory]
    [InlineData("", "123456", "Empleado")]
    [InlineData("Usuario Test", "sinmayuscula1!", "Empleado")]
    [InlineData("Usuario Test", "SINMINUSCULA1!", "Empleado")]
    [InlineData("Usuario Test", "SinNumero!", "Empleado")]
    [InlineData("Usuario Test", "SinEspecial1", "Empleado")]
    public async Task Registro_PasswordInvalida_ReturnsBadRequest(
        string nombre, string password, string rol)
    {
        //Arrange
        var request = new
        {
            nombreUsuario = nombre,
            email         = $"test_{Guid.NewGuid()}@alflab.mx",
            password      = password,
            rol           = rol
        };

        //Act
        var response = await _http.PostAsJsonAsync("api/Auth/registro", request);

        //Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Registro_RolInvalido_ReturnsBadRequest()
    {
        //Arrange
        var request = new
        {
            nombreUsuario = "Usuario Test",
            email         = $"test_{Guid.NewGuid()}@alflab.mx",
            password      = "Test123!",
            rol           = "RolInvalido"
        };

        //Act
        var response = await _http.PostAsJsonAsync("api/Auth/registro", request);

        //Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Login_Ok()
    {
        //Arrange
        var request = new
        {
            email    = "admin@alflab.mx",
            password = "Admin123!"
        };

        //Act
        var response  = await _http.PostAsJsonAsync("api/Auth/login", request);
        var content   = await response.Content.ReadAsStringAsync();
        var resultado = JsonSerializer.Deserialize<JsonElement>(content);

        //Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(resultado.TryGetProperty("token", out var token));
        Assert.NotEmpty(token.GetString()!);
    }

    [Fact]
    public async Task Login_CredencialesInvalidas_ReturnsUnauthorized()
    {
        //Arrange
        var request = new
        {
            email    = "noexiste@alflab.mx",
            password = "Password123!"
        };

        //Act
        var response = await _http.PostAsJsonAsync("api/Auth/login", request);

        //Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Theory]
    [InlineData("", "Admin123!")]
    [InlineData("correo-invalido", "Admin123!")]
    [InlineData("admin@alflab.mx", "")]
    public async Task Login_DatosInvalidos_ReturnsBadRequest(
        string email, string password)
    {
        //Arrange
        var request = new { email, password };

        //Act
        var response = await _http.PostAsJsonAsync("api/Auth/login", request);

        //Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

}