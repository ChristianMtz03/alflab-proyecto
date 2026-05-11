import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import supertest from 'supertest';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:            true,
      forbidNonWhitelisted: true,
      transform:            true,
    }),
  );

  await app.init();
  return app;
}

export async function getToken(app: INestApplication): Promise<string> {
  const response = await supertest(app.getHttpServer())
    .post('/api/auth/login')
    .send({ email: 'admin@alflab.mx', password: 'Admin123!' });

  return response.body.token ?? '';
}