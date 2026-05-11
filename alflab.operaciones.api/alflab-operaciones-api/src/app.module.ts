import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { CotizacionesModule } from './cotizaciones/cotizaciones.module';
import { SecurityHeadersMiddleware } from './common/middlewares/security-headers.middleware';
import { InputSanitizationMiddleware } from './common/middlewares/input-sanitization.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        name:  'global',
        ttl:   60000,
        limit: 60,
      },
      {
        name:  'login',
        ttl:   300000,
        limit: 5,
      },
    ]),
    DatabaseModule,
    AuthModule,
    ProductosModule,
    CotizacionesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityHeadersMiddleware, InputSanitizationMiddleware)
      .forRoutes('*');
  }
}