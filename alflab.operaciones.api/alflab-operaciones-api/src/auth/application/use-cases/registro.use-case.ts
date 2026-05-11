import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUsuarioRepository } from '../../domain/interfaces/usuario.repository.interface';
import { RegistroDto } from '../dto/registro.dto';
import { Usuario } from '../../domain/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistroUseCase {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async execute(dto: RegistroDto): Promise<{ message: string }> {
    const emailExiste = await this.usuarioRepository.emailExiste(dto.email);

    if (emailExiste)
      throw new BadRequestException('El email ya está registrado.');

    const usuario = new Usuario();
    usuario.nombreUsuario = dto.nombreUsuario;
    usuario.email         = dto.email;
    usuario.passwordHash  = await bcrypt.hash(dto.password, 10);
    usuario.rol           = dto.rol;
    usuario.activo        = true;

    await this.usuarioRepository.crear(usuario);
    return { message: 'Usuario registrado correctamente.' };
  }
}