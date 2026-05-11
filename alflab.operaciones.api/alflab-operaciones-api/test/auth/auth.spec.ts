import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { createTestApp, getToken } from '../app.e2e.helper';

describe('Auth', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /api/auth/registro - debe registrar un usuario nuevo', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/auth/registro')
      .send({
        nombreUsuario: 'Usuario Test',
        email:         `test_${Date.now()}@alflab.mx`,
        password:      'Test123!',
        rol:           'Empleado',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuario registrado correctamente.');
  });

  it('POST /api/auth/registro - debe rechazar email duplicado', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/auth/registro')
      .send({
        nombreUsuario: 'Admin AlfLab',
        email:         'admin@alflab.mx',
        password:      'Admin123!',
        rol:           'Administrador',
      });

    expect(response.status).toBe(400);
  });

  it.each([
    ['', 'Test123!', 'Empleado'],
    ['Usuario', 'sinmayuscula1!', 'Empleado'],
    ['Usuario', 'SINMINUSCULA1!', 'Empleado'],
    ['Usuario', 'SinNumero!', 'Empleado'],
    ['Usuario', 'SinEspecial1', 'Empleado'],
  ])(
    'POST /api/auth/registro - debe rechazar password inválida (%s, %s)',
    async (nombre, password, rol) => {
      const response = await supertest(app.getHttpServer())
        .post('/api/auth/registro')
        .send({
          nombreUsuario: nombre,
          email:         `test_${Date.now()}@alflab.mx`,
          password,
          rol,
        });

      expect(response.status).toBe(400);
    },
  );

  it('POST /api/auth/login - debe devolver token', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'admin@alflab.mx', password: 'Admin123!' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  it('POST /api/auth/login - debe rechazar credenciales inválidas', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'noexiste@alflab.mx', password: 'Password123!' });

    expect(response.status).toBe(401);
  });

  it.each([
    ['', 'Admin123!'],
    ['correo-invalido', 'Admin123!'],
    ['admin@alflab.mx', ''],
  ])(
    'POST /api/auth/login - debe rechazar datos inválidos (%s)',
    async (email, password) => {
      const response = await supertest(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email, password });

      expect(response.status).toBe(400);
    },
  );

  it('POST /api/auth/login - debe rechazar usuario inactivo', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'inactivo@alflab.mx', password: 'password' });

    expect(response.status).toBe(401);
  });

  it('POST /api/auth/registro - email que no existe debe devolver false en emailExiste', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/auth/registro')
      .send({
        nombreUsuario: 'Nuevo Usuario',
        email:         `nuevo_${Date.now()}@alflab.mx`,
        password:      'Nuevo123!',
        rol:           'Empleado',
      });

    expect(response.status).toBe(200);
  });

  it('POST /api/auth/login - email completamente nuevo no debe existir', async () => {
    const emailNuevo = `nuevo_${Date.now()}_${Math.random()}@noexiste.mx`;

    const response = await supertest(app.getHttpServer())
      .post('/api/auth/login')
      .send({
        email:    emailNuevo,
        password: 'Password123!',
      });

    expect(response.status).toBe(401);
  });
});