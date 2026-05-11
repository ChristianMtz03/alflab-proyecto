import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsuarioRepository } from '../../domain/interfaces/usuario.repository.interface';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    const usuario = await this.usuarioRepository.findByEmail(dto.email);

    if (!usuario || !usuario.activo)
      throw new UnauthorizedException('Credenciales inválidas.');

    const passwordValido = await bcrypt.compare(dto.password, usuario.passwordHash);

    if (!passwordValido)
      throw new UnauthorizedException('Credenciales inválidas.');

    const expiracion = new Date();
    expiracion.setHours(expiracion.getHours() + 8);

    const payload = {
      sub:   usuario.idUsuario,
      name:  usuario.nombreUsuario,
      email: usuario.email,
      role:  usuario.rol,
    };

    return {
      token:         this.jwtService.sign(payload),
      nombreUsuario: usuario.nombreUsuario,
      email:         usuario.email,
      rol:           usuario.rol,
      expiracion,
    };
  }
}