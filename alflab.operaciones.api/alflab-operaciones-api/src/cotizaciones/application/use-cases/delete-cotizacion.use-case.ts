import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICotizacionRepository } from '../../domain/interfaces/cotizacion.repository.interface';

@Injectable()
export class DeleteCotizacionUseCase {
  constructor(
    @Inject(ICotizacionRepository)
    private readonly cotizacionRepository: ICotizacionRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const eliminado = await this.cotizacionRepository.eliminar(id);

    if (!eliminado)
      throw new NotFoundException(`Cotización con ID ${id} no encontrada.`);
  }
}