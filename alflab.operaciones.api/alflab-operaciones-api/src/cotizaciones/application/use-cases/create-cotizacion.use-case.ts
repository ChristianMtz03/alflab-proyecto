import { Inject, Injectable } from '@nestjs/common';
import { ICotizacionRepository } from '../../domain/interfaces/cotizacion.repository.interface';
import { CreateCotizacionDto } from '../dto/create-cotizacion.dto';

@Injectable()
export class CreateCotizacionUseCase {
  constructor(
    @Inject(ICotizacionRepository)
    private readonly cotizacionRepository: ICotizacionRepository,
  ) {}

  async execute(dto: CreateCotizacionDto): Promise<{ id: number }> {
    const total = dto.detalles.reduce(
      (sum, d) => sum + d.cantidad * d.precioUnitario,
      0,
    );

    const cotizacion = {
      idCotizacion:  0,
      idCliente:     dto.idCliente,
      fechaCreacion: new Date(),
      estatus:       'Pendiente',
      total:         Math.round(total * 100) / 100,
      detalles:      dto.detalles.map((d) => ({
        idDetalle:      0,
        idCotizacion:   0,
        idProducto:     d.idProducto,
        cantidad:       d.cantidad,
        precioUnitario: d.precioUnitario,
        subtotal:       Math.round(d.cantidad * d.precioUnitario * 100) / 100,
      })),
    };

    const id = await this.cotizacionRepository.crear(cotizacion);
    return { id };
  }
}