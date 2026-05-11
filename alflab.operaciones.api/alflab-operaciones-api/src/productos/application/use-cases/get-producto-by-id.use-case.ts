import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductoRepository } from '../../domain/interfaces/producto.repository.interface';
import { Producto } from '../../domain/entities/producto.entity';

@Injectable()
export class GetProductoByIdUseCase {
  constructor(
    @Inject(IProductoRepository)
    private readonly productoRepository: IProductoRepository,
  ) {}

  async execute(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findById(id);

    if (!producto)
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);

    return producto;
  }
}