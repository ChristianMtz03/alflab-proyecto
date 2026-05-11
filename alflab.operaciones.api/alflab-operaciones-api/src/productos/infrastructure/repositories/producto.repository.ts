import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from '../../../database/database.service';
import { IProductoRepository } from '../../domain/interfaces/producto.repository.interface';
import { Producto } from '../../domain/entities/producto.entity';

interface ProductoRow extends RowDataPacket {
  Id_producto:        number;
  CodigoBarra:        string;
  NombreProducto:     string;
  Caracteristicas:    string | null;
  Precio:             number;
  CantidadExistencia: number;
  Id_proveedor:       number | null;
}

@Injectable()
export class ProductoRepository implements IProductoRepository {
  constructor(private readonly db: DatabaseService) {}

  private mapRow(row: ProductoRow): Producto {
    return {
      idProducto:         row.Id_producto,
      codigoBarra:        row.CodigoBarra,
      nombreProducto:     row.NombreProducto,
      caracteristicas:    row.Caracteristicas,
      precio:             Number(row.Precio),
      cantidadExistencia: row.CantidadExistencia,
      idProveedor:        row.Id_proveedor,
    };
  }

  async findAll(): Promise<Producto[]> {
    const rows = await this.db.query<ProductoRow>(
      `SELECT Id_producto, CodigoBarra, NombreProducto,
              Caracteristicas, Precio, CantidadExistencia, Id_proveedor
       FROM productos`,
    );
    return rows.map((r) => this.mapRow(r));
  }

  async findById(id: number): Promise<Producto | null> {
    const row = await this.db.queryOne<ProductoRow>(
      `SELECT Id_producto, CodigoBarra, NombreProducto,
              Caracteristicas, Precio, CantidadExistencia, Id_proveedor
       FROM productos WHERE Id_producto = ?`,
      [id],
    );
    return row ? this.mapRow(row) : null;
  }

  async crear(producto: Producto): Promise<number> {
    const result = await this.db.execute(
      `INSERT INTO productos
         (CodigoBarra, NombreProducto, Caracteristicas, Precio, CantidadExistencia, Id_proveedor)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        producto.codigoBarra,
        producto.nombreProducto,
        producto.caracteristicas,
        producto.precio,
        producto.cantidadExistencia,
        producto.idProveedor,
      ],
    );
    return result.insertId;
  }

  async actualizar(producto: Producto): Promise<boolean> {
    const result = await this.db.execute(
      `UPDATE productos SET
         CodigoBarra        = ?,
         NombreProducto     = ?,
         Caracteristicas    = ?,
         Precio             = ?,
         CantidadExistencia = ?,
         Id_proveedor       = ?
       WHERE Id_producto = ?`,
      [
        producto.codigoBarra,
        producto.nombreProducto,
        producto.caracteristicas,
        producto.precio,
        producto.cantidadExistencia,
        producto.idProveedor,
        producto.idProducto,
      ],
    );
    return result.affectedRows > 0;
  }

  async eliminar(id: number): Promise<boolean> {
    const result = await this.db.execute(
      `DELETE FROM productos WHERE Id_producto = ?`,
      [id],
    );
    return result.affectedRows > 0;
  }
}