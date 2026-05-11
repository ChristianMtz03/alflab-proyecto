export class Producto {
  idProducto: number;
  codigoBarra: string;
  nombreProducto: string;
  caracteristicas: string | null;
  precio: number;
  cantidadExistencia: number;
  idProveedor: number | null;
}