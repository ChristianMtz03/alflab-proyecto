import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { RegistroUseCase } from './application/use-cases/registro.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { UsuarioRepository } from './infrastructure/repositories/usuario.repository';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { IUsuarioRepository } from './domain/interfaces/usuario.repository.interface';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports:    [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret:      configService.get<string>('JWT_SECRET') as string,
        signOptions: { expiresIn: '8h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegistroUseCase,
    LoginUseCase,
    JwtStrategy,
    {
      provide:  IUsuarioRepository,
      useClass: UsuarioRepository,
    },
  ],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}