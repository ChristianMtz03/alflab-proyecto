import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductoRepository } from '../../domain/interfaces/producto.repository.interface';

@Injectable()
export class DeleteProductoUseCase {
  constructor(
    @Inject(IProductoRepository)
    private readonly productoRepository: IProductoRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const eliminado = await this.productoRepository.eliminar(id);

    if (!eliminado)
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
  }
}