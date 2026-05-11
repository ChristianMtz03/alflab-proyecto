import { Producto } from '../entities/producto.entity';

export interface IProductoRepository {
  findAll(): Promise<Producto[]>;
  findById(id: number): Promise<Producto | null>;
  crear(producto: Producto): Promise<number>;
  actualizar(producto: Producto): Promise<boolean>;
  eliminar(id: number): Promise<boolean>;
}

export const IProductoRepository = Symbol('IProductoRepository');