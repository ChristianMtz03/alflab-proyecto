# ── ETAPA 1: Compilar el proyecto ──────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar nuget.config primero
COPY nuget.config .

# Copiar archivos de proyecto para restaurar dependencias
COPY ["AlfLab.Catalogos.Api/AlfLab.Catalogos.Api.csproj", "AlfLab.Catalogos.Api/"]
COPY ["AlfLab.Catalogos.Api.Application/AlfLab.Catalogos.Api.Application.csproj", "AlfLab.Catalogos.Api.Application/"]
COPY ["AlfLab.Catalogos.Api.Domain/AlfLab.Catalogos.Api.Domain.csproj", "AlfLab.Catalogos.Api.Domain/"]
COPY ["AlfLab.Catalogos.Api.Infrastructure/AlfLab.Catalogos.Api.Infrastructure.csproj", "AlfLab.Catalogos.Api.Infrastructure/"]
COPY ["AlfLab.Catalogos.Api.Presentation/AlfLab.Catalogos.Api.Presentation.csproj", "AlfLab.Catalogos.Api.Presentation/"]

RUN dotnet restore "AlfLab.Catalogos.Api/AlfLab.Catalogos.Api.csproj"

# Copiar todo el código fuente
COPY . .

# Compilar y publicar
RUN dotnet publish "AlfLab.Catalogos.Api/AlfLab.Catalogos.Api.csproj" \
    -c Release \
    -o /app/publish

# ── ETAPA 2: Imagen final ligera para ejecutar ─────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "AlfLab.Catalogos.Api.dll"]