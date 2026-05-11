import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { createTestApp, getToken } from '../app.e2e.helper';

describe('Cotizaciones', () => {
  let app:        INestApplication;
  let token:      string;
  let idProducto: number;

  beforeAll(async () => {
    app   = await createTestApp();
    token = await getToken(app);

    const producto = await supertest(app.getHttpServer())
      .post('/api/productos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        codigoBarra:        `COT${Date.now()}`,
        nombreProducto:     'Producto Para Cotizacion Test',
        caracteristicas:    null,
        precio:             100.00,
        cantidadExistencia: 50,
        idProveedor:        null,
      });

    idProducto = producto.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/cotizaciones - sin token debe retornar 401', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/cotizaciones');

    expect(response.status).toBe(401);
  });

  it('GET /api/cotizaciones - con token debe retornar 200', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/cotizaciones')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('POST /api/cotizaciones - debe crear una cotización', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/cotizaciones')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idCliente: 1,
        detalles: [
          {
            idProducto,
            cantidad:       2,
            precioUnitario: 100.00,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
  });

  it('GET /api/cotizaciones/:id - debe retornar la cotización con detalles', async () => {
    const crear = await supertest(app.getHttpServer())
      .post('/api/cotizaciones')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idCliente: 1,
        detalles: [
          {
            idProducto,
            cantidad:       1,
            precioUnitario: 100.00,
          },
        ],
      });

    const id = crear.body.id;

    const response = await supertest(app.getHttpServer())
      .get(`/api/cotizaciones/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.idCotizacion).toBe(id);
    expect(response.body.detalles).toBeDefined();
    expect(response.body.detalles.length).toBeGreaterThan(0);
  });

  it('GET /api/cotizaciones/:id - ID inexistente debe retornar 404', async () => {
    const response = await supertest(app.getHttpServer())
      .get('/api/cotizaciones/99999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('PUT /api/cotizaciones/:id/estatus - debe actualizar el estatus', async () => {
    const crear = await supertest(app.getHttpServer())
      .post('/api/cotizaciones')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idCliente: 1,
        detalles: [
          {
            idProducto,
            cantidad:       1,
            precioUnitario: 100.00,
          },
        ],
      });

    const id = crear.body.id;

    const response = await supertest(app.getHttpServer())
      .put(`/api/cotizaciones/${id}/estatus`)
      .set('Authorization', `Bearer ${token}`)
      .send({ estatus: 'Aprobada' });

    expect(response.status).toBe(204);
  });

  it.each([
    ['EstatusInvalido'],
    [''],
  ])(
    'PUT /api/cotizaciones/:id/estatus - estatus inválido debe retornar 400',
    async (estatus) => {
      const response = await supertest(app.getHttpServer())
        .put('/api/cotizaciones/1/estatus')
        .set('Authorization', `Bearer ${token}`)
        .send({ estatus });

      expect(response.status).toBe(400);
    },
  );

  it('DELETE /api/cotizaciones/:id - debe eliminar la cotización', async () => {
    const crear = await supertest(app.getHttpServer())
      .post('/api/cotizaciones')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idCliente: 1,
        detalles: [
          {
            idProducto,
            cantidad:       1,
            precioUnitario: 100.00,
          },
        ],
      });

    const id = crear.body.id;

    const response = await supertest(app.getHttpServer())
      .delete(`/api/cotizaciones/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('DELETE /api/cotizaciones/:id - ID inexistente debe retornar 404', async () => {
    const response = await supertest(app.getHttpServer())
      .delete('/api/cotizaciones/99999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it('POST /api/cotizaciones - sin detalles debe retornar 400', async () => {
    const response = await supertest(app.getHttpServer())
      .post('/api/cotizaciones')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idCliente: 1,
        detalles:  [],
      });

    expect(response.status).toBe(400);
  });

  it('PUT /api/cotizaciones/:id/estatus - ID inexistente debe retornar 404', async () => {
    const response = await supertest(app.getHttpServer())
      .put('/api/cotizaciones/99999/estatus')
      .set('Authorization', `Bearer ${token}`)
      .send({ estatus: 'Aprobada' });

    expect(response.status).toBe(404);
  });
});