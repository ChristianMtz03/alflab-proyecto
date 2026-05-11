import {
  Controller, Get, Post, Put, Delete,
  Param, Body, ParseIntPipe, HttpCode, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetAllProductosUseCase } from './application/use-cases/get-all-productos.use-case';
import { GetProductoByIdUseCase } from './application/use-cases/get-producto-by-id.use-case';
import { CreateProductoUseCase } from './application/use-cases/create-producto.use-case';
import { UpdateProductoUseCase } from './application/use-cases/update-producto.use-case';
import { DeleteProductoUseCase } from './application/use-cases/delete-producto.use-case';
import { CreateProductoDto } from './application/dto/create-producto.dto';
import { UpdateProductoDto } from './application/dto/update-producto.dto';

@ApiTags('Productos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/productos')
export class ProductosController {
  constructor(
    private readonly getAllUseCase:    GetAllProductosUseCase,
    private readonly getByIdUseCase:  GetProductoByIdUseCase,
    private readonly createUseCase:   CreateProductoUseCase,
    private readonly updateUseCase:   UpdateProductoUseCase,
    private readonly deleteUseCase:   DeleteProductoUseCase,
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
  async create(@Body() dto: CreateProductoDto) {
    return this.createUseCase.execute(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductoDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUseCase.execute(id);
  }
}