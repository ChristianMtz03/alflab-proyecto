import { Cotizacion } from '../entities/cotizacion.entity';

export interface ICotizacionRepository {
  findAll(): Promise<Cotizacion[]>;
  findById(id: number): Promise<Cotizacion | null>;
  crear(cotizacion: Cotizacion): Promise<number>;
  actualizarEstatus(id: number, estatus: string): Promise<boolean>;
  eliminar(id: number): Promise<boolean>;
}

export const ICotizacionRepository = Symbol('ICotizacionRepository');