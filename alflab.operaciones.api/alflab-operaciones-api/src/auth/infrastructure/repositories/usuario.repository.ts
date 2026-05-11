import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from '../../../database/database.service';
import { IUsuarioRepository } from '../../domain/interfaces/usuario.repository.interface';
import { Usuario } from '../../domain/entities/usuario.entity';

interface UsuarioRow extends RowDataPacket {
  Id_usuario:    number;
  NombreUsuario: string;
  Email:         string;
  PasswordHash:  string;
  Rol:           string;
  Activo:        number;
}

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(private readonly db: DatabaseService) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    const row = await this.db.queryOne<UsuarioRow>(
      `SELECT Id_usuario, NombreUsuario, Email, PasswordHash, Rol, Activo
       FROM usuarios WHERE Email = ?`,
      [email],
    );

    if (!row) return null;

    const usuario = new Usuario();
    usuario.idUsuario     = row.Id_usuario;
    usuario.nombreUsuario = row.NombreUsuario;
    usuario.email         = row.Email;
    usuario.passwordHash  = row.PasswordHash;
    usuario.rol           = row.Rol;
    usuario.activo        = row.Activo === 1;
    return usuario;
  }

  async emailExiste(email: string): Promise<boolean> {
    const row = await this.db.queryOne<RowDataPacket>(
      `SELECT COUNT(1) AS total FROM usuarios WHERE Email = ?`,
      [email],
    );

    if (!row) return false;
    return row['total'] > 0;
  }

  async crear(usuario: Usuario): Promise<number> {
    const result = await this.db.execute(
      `INSERT INTO usuarios (NombreUsuario, Email, PasswordHash, Rol, Activo)
       VALUES (?, ?, ?, ?, ?)`,
      [usuario.nombreUsuario, usuario.email, usuario.passwordHash, usuario.rol, usuario.activo ? 1 : 0],
    );
    return result.insertId;
  }
}