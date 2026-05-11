import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICotizacionRepository } from '../../domain/interfaces/cotizacion.repository.interface';
import { Cotizacion } from '../../domain/entities/cotizacion.entity';

@Injectable()
export class GetCotizacionByIdUseCase {
  constructor(
    @Inject(ICotizacionRepository)
    private readonly cotizacionRepository: ICotizacionRepository,
  ) {}

  async execute(id: number): Promise<Cotizacion> {
    const cotizacion = await this.cotizacionRepository.findById(id);

    if (!cotizacion)
      throw new NotFoundException(`Cotización con ID ${id} no encontrada.`);

    return cotizacion;
  }
}