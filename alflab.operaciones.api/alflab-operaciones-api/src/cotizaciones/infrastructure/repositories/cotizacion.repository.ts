import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2';
import { DatabaseService } from '../../../database/database.service';
import { ICotizacionRepository } from '../../domain/interfaces/cotizacion.repository.interface';
import { Cotizacion, CotizacionDetalle } from '../../domain/entities/cotizacion.entity';

interface CotizacionRow extends RowDataPacket {
  Id_cotizacion: number;
  Id_cliente:    number;
  FechaCreacion: Date;
  Estatus:       string;
  Total:         number;
}

interface DetalleRow extends RowDataPacket {
  Id_detalle:     number;
  Id_cotizacion:  number;
  Id_producto:    number;
  Cantidad:       number;
  PrecioUnitario: number;
  Subtotal:       number;
}

@Injectable()
export class CotizacionRepository implements ICotizacionRepository {
  constructor(private readonly db: DatabaseService) {}

  private mapCotizacion(row: CotizacionRow, detalles: CotizacionDetalle[]): Cotizacion {
    return {
      idCotizacion:  row.Id_cotizacion,
      idCliente:     row.Id_cliente,
      fechaCreacion: row.FechaCreacion,
      estatus:       row.Estatus,
      total:         Number(row.Total),
      detalles,
    };
  }

  private mapDetalle(row: DetalleRow): CotizacionDetalle {
    return {
      idDetalle:      row.Id_detalle,
      idCotizacion:   row.Id_cotizacion,
      idProducto:     row.Id_producto,
      cantidad:       row.Cantidad,
      precioUnitario: Number(row.PrecioUnitario),
      subtotal:       Number(row.Subtotal),
    };
  }

  async findAll(): Promise<Cotizacion[]> {
    const cotizaciones = await this.db.query<CotizacionRow>(
      `SELECT Id_cotizacion, Id_cliente, FechaCreacion, Estatus, Total
       FROM cotizaciones`,
    );

    const result: Cotizacion[] = [];

    for (const c of cotizaciones) {
      const detalles = await this.db.query<DetalleRow>(
        `SELECT Id_detalle, Id_cotizacion, Id_producto, Cantidad, PrecioUnitario, Subtotal
         FROM cotizacion_detalle WHERE Id_cotizacion = ?`,
        [c.Id_cotizacion],
      );
      result.push(this.mapCotizacion(c, detalles.map((d) => this.mapDetalle(d))));
    }

    return result;
  }

  async findById(id: number): Promise<Cotizacion | null> {
    const row = await this.db.queryOne<CotizacionRow>(
      `SELECT Id_cotizacion, Id_cliente, FechaCreacion, Estatus, Total
       FROM cotizaciones WHERE Id_cotizacion = ?`,
      [id],
    );

    if (!row) return null;

    const detalles = await this.db.query<DetalleRow>(
      `SELECT Id_detalle, Id_cotizacion, Id_producto, Cantidad, PrecioUnitario, Subtotal
       FROM cotizacion_detalle WHERE Id_cotizacion = ?`,
      [id],
    );

    return this.mapCotizacion(row, detalles.map((d) => this.mapDetalle(d)));
  }

  async crear(cotizacion: Cotizacion): Promise<number> {
    const result = await this.db.execute(
      `INSERT INTO cotizaciones (Id_cliente, FechaCreacion, Estatus, Total)
       VALUES (?, ?, ?, ?)`,
      [
        cotizacion.idCliente,
        cotizacion.fechaCreacion,
        cotizacion.estatus,
        cotizacion.total,
      ],
    );

    const idCotizacion = result.insertId;

    for (const detalle of cotizacion.detalles) {
      await this.db.execute(
        `INSERT INTO cotizacion_detalle
           (Id_cotizacion, Id_producto, Cantidad, PrecioUnitario, Subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [
          idCotizacion,
          detalle.idProducto,
          detalle.cantidad,
          detalle.precioUnitario,
          detalle.subtotal,
        ],
      );
    }

    return idCotizacion;
  }

  async actualizarEstatus(id: number, estatus: string): Promise<boolean> {
    const result = await this.db.execute(
      `UPDATE cotizaciones SET Estatus = ? WHERE Id_cotizacion = ?`,
      [estatus, id],
    );
    return result.affectedRows > 0;
  }

  async eliminar(id: number): Promise<boolean> {
    const result = await this.db.execute(
      `DELETE FROM cotizaciones WHERE Id_cotizacion = ?`,
      [id],
    );
    return result.affectedRows > 0;
  }
}