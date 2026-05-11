import { Inject, Injectable } from '@nestjs/common';
import { ICotizacionRepository } from '../../domain/interfaces/cotizacion.repository.interface';
import { Cotizacion } from '../../domain/entities/cotizacion.entity';

@Injectable()
export class GetAllCotizacionesUseCase {
  constructor(
    @Inject(ICotizacionRepository)
    private readonly cotizacionRepository: ICotizacionRepository,
  ) {}

  async execute(): Promise<Cotizacion[]> {
    return this.cotizacionRepository.findAll();
  }
}