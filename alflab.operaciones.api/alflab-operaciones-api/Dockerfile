# ── ETAPA 1: Instalar dependencias y compilar ──────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias primero
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# ── ETAPA 2: Imagen final solo con lo necesario ────────────────────
FROM node:20-alpine AS final
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]