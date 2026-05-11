import {
  Controller, Get, Post, Put, Delete,
  Param, Body, ParseIntPipe, HttpCode, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetAllCotizacionesUseCase } from './application/use-cases/get-all-cotizaciones.use-case';
import { GetCotizacionByIdUseCase } from './application/use-cases/get-cotizacion-by-id.use-case';
import { CreateCotizacionUseCase } from './application/use-cases/create-cotizacion.use-case';
import { UpdateEstatusUseCase } from './application/use-cases/update-estatus.use-case';
import { DeleteCotizacionUseCase } from './application/use-cases/delete-cotizacion.use-case';
import { CreateCotizacionDto } from './application/dto/create-cotizacion.dto';
import { UpdateEstatusDto } from './application/dto/update-estatus.dto';

@ApiTags('Cotizaciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/cotizaciones')
export class CotizacionesController {
  constructor(
    private readonly getAllUseCase:       GetAllCotizacionesUseCase,
    private readonly getByIdUseCase:     GetCotizacionByIdUseCase,
    private readonly createUseCase:      CreateCotizacionUseCase,
    private readonly updateEstatusUseCase: UpdateEstatusUseCase,
    private readonly deleteUseCase:      DeleteCotizacionUseCase,
  ) {}

  @Get()
  async getAll() {
    return this.getAllUseCase.execute();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.getByIdUseCase.execute(id);
  }

  @Post()
  async create(@Body() dto: CreateCotizacionDto) {
    return this.createUseCase.execute(dto);
  }

  @Put(':id/estatus')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateEstatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstatusDto,
  ) {
    return this.updateEstatusUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUseCase.execute(id);
  }
}