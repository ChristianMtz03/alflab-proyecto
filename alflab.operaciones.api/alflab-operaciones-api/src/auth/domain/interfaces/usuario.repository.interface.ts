import { Usuario } from '../entities/usuario.entity';

export interface IUsuarioRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  emailExiste(email: string): Promise<boolean>;
  crear(usuario: Usuario): Promise<number>;
}

export const IUsuarioRepository = Symbol('IUsuarioRepository');