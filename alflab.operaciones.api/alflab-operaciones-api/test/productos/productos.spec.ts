import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { createTestApp, getToken } from '../app.e2e.helper';

describe('Productos', () => {
  let app:   INestApplication;
  let token: string;

  beforeAll(async () => {
    app   = await createTestApp();
    token = await getToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/productos - sin token debe retornar 401', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/productos');

    expect(response.status).toBe(401);
  });

  it('GET /api/productos - con token debe retornar 200', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/productos')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/productos - debe crear un producto', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigoBarra:        `TEST${Date.now()}`,
        nombreProducto:     'Producto Test',
        caracteristicas:    'Características de prueba',
        precio:             99.99,
        cantidadExistencia: 10,
        idProveedor:        null,
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it('GET /api/productos/:id - debe retornar el producto creado', async () => {
    const crear = await supertest(app.getHttpServer())
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigoBarra:        `TEST${Date.now()}`,
        nombreProducto:     'Producto Para GetById',
        caracteristicas:    null,
        precio:             50.00,
        cantidadExistencia: 5,
        idProveedor:        null,
      });

    const id = crear.body.id;

    const response = await supertest(app.getHttpServer())
      .get(`/api/productos/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.idProducto).toBe(id);
  });

  it('GET /api/productos/:id - ID inexistente debe retornar 404', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/productos/99999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('PUT /api/productos/:id - debe actualizar el producto', async () => {
    const crear = await supertest(app.getHttpServer())
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigoBarra:        `TEST${Date.now()}`,
        nombreProducto:     'Producto Para Update',
        caracteristicas:    null,
        precio:             50.00,
        cantidadExistencia: 5,
        idProveedor:        null,
      });

    const id = crear.body.id;

    const response = await supertest(app.getHttpServer())
      .put(`/api/productos/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigoBarra:        `TEST${Date.now()}`,
        nombreProducto:     'Producto Actualizado',
        caracteristicas:    'Nueva característica',
        precio:             75.00,
        cantidadExistencia: 8,
        idProveedor:        null,
      });

    expect(response.status).toBe(204);
  });

  it('PUT /api/productos/:id - ID inexistente debe retornar 404', async () => {
    const response = await supertest(app.getHttpServer())
      .put('/api/productos/99999')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigoBarra:        'TEST99999',
        nombreProducto:     'Fantasma',
        caracteristicas:    null,
        precio:             10.00,
        cantidadExistencia: 1,
        idProveedor:        null,
      });

    expect(response.status).toBe(404);
  });

  it.each([
    ['', 'TEST001', 50.00, 5],
    ['Producto', '', 50.00, 5],
    ['Producto', 'TEST001', -1, 5],
    ['Producto', 'TEST001', 50.00, -1],
  ])(
    'POST /api/productos - datos inválidos deben retornar 400',
    async (nombreProducto, codigoBarra, precio, cantidadExistencia) => {
      const response = await supertest(app.getHttpServer())
        .post('/api/productos')
        .set('Authorization', `Bearer ${token}`)
        .send({ nombreProducto, codigoBarra, precio, cantidadExistencia });

      expect(response.status).toBe(400);
    },
  );

  it('DELETE /api/productos/:id - debe eliminar el producto', async () => {
    const crear = await supertest(app.getHttpServer())
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigoBarra:        `TEST${Date.now()}`,
        nombreProducto:     'Producto Para Eliminar',
        caracteristicas:    null,
        precio:             30.00,
        cantidadExistencia: 2,
        idProveedor:        null,
      });

    const id = crear.body.id;

    const response = await supertest(app.getHttpServer())
      .delete(`/api/productos/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('DELETE /api/productos/:id - ID inexistente debe retornar 404', async () => {
    const response = await supertest(app.getHttpServer())
      .delete('/api/productos/99999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('POST /api/productos - debe bloquear contenido XSS', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigoBarra:        'TEST001',
        nombreProducto:     '<script>alert("xss")</script>',
        caracteristicas:    null,
        precio:             10.00,
        cantidadExistencia: 1,
        idProveedor:        null,
      });

    expect(response.status).toBe(400);
  });
});