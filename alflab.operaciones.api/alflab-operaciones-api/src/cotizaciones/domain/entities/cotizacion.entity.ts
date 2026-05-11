export class CotizacionDetalle {
  idDetalle: number;
  idCotizacion: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export class Cotizacion {
  idCotizacion: number;
  idCliente: number;
  fechaCreacion: Date;
  estatus: string;
  total: number;
  detalles: CotizacionDetalle[];
}