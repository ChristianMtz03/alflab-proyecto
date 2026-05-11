import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICotizacionRepository } from '../../domain/interfaces/cotizacion.repository.interface';
import { UpdateEstatusDto } from '../dto/update-estatus.dto';

@Injectable()
export class UpdateEstatusUseCase {
  constructor(
    @Inject(ICotizacionRepository)
    private readonly cotizacionRepository: ICotizacionRepository,
  ) {}

  async execute(id: number, dto: UpdateEstatusDto): Promise<void> {
    const actualizado = await this.cotizacionRepository.actualizarEstatus(
      id,
      dto.estatus,
    );

    if (!actualizado)
      throw new NotFoundException(`Cotización con ID ${id} no encontrada.`);
  }
}