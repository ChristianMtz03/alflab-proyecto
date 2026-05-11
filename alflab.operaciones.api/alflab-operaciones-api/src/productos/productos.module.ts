import { Module } from '@nestjs/common';
import { ProductosController } from './productos.controller';
import { GetAllProductosUseCase } from './application/use-cases/get-all-productos.use-case';
import { GetProductoByIdUseCase } from './application/use-cases/get-producto-by-id.use-case';
import { CreateProductoUseCase } from './application/use-cases/create-producto.use-case';
import { UpdateProductoUseCase } from './application/use-cases/update-producto.use-case';
import { DeleteProductoUseCase } from './application/use-cases/delete-producto.use-case';
import { ProductoRepository } from './infrastructure/repositories/producto.repository';
import { IProductoRepository } from './domain/interfaces/producto.repository.interface';

@Module({
  controllers: [ProductosController],
  providers: [
    GetAllProductosUseCase,
    GetProductoByIdUseCase,
    CreateProductoUseCase,
    UpdateProductoUseCase,
    DeleteProductoUseCase,
    {
      provide:  IProductoRepository,
      useClass: ProductoRepository,
    },
  ],
})
export class ProductosModule {}