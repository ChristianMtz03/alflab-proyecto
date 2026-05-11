import { Inject, Injectable } from '@nestjs/common';
import { IProductoRepository } from '../../domain/interfaces/producto.repository.interface';
import { Producto } from '../../domain/entities/producto.entity';

@Injectable()
export class GetAllProductosUseCase {
  constructor(
    @Inject(IProductoRepository)
    private readonly productoRepository: IProductoRepository,
  ) {}

  async execute(): Promise<Producto[]> {
    return this.productoRepository.findAll();
  }
}