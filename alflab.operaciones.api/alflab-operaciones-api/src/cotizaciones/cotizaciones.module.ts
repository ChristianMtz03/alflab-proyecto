import { Module } from '@nestjs/common';
import { CotizacionesController } from './cotizaciones.controller';
import { GetAllCotizacionesUseCase } from './application/use-cases/get-all-cotizaciones.use-case';
import { GetCotizacionByIdUseCase } from './application/use-cases/get-cotizacion-by-id.use-case';
import { CreateCotizacionUseCase } from './application/use-cases/create-cotizacion.use-case';
import { UpdateEstatusUseCase } from './application/use-cases/update-estatus.use-case';
import { DeleteCotizacionUseCase } from './application/use-cases/delete-cotizacion.use-case';
import { CotizacionRepository } from './infrastructure/repositories/cotizacion.repository';
import { ICotizacionRepository } from './domain/interfaces/cotizacion.repository.interface';

@Module({
  controllers: [CotizacionesController],
  providers: [
    GetAllCotizacionesUseCase,
    GetCotizacionByIdUseCase,
    CreateCotizacionUseCase,
    UpdateEstatusUseCase,
    DeleteCotizacionUseCase,
    {
      provide:  ICotizacionRepository,
      useClass: CotizacionRepository,
    },
  ],
})
export class CotizacionesModule {}