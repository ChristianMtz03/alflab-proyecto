import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IProductoRepository } from '../../domain/interfaces/producto.repository.interface';
import { UpdateProductoDto } from '../dto/update-producto.dto';

@Injectable()
export class UpdateProductoUseCase {
  constructor(
    @Inject(IProductoRepository)
    private readonly productoRepository: IProductoRepository,
  ) {}

  async execute(id: number, dto: UpdateProductoDto): Promise<void> {
    const producto = {
      idProducto:         id,
      codigoBarra:        dto.codigoBarra,
      nombreProducto:     dto.nombreProducto,
      caracteristicas:    dto.caracteristicas ?? null,
      precio:             dto.precio,
      cantidadExistencia: dto.cantidadExistencia,
      idProveedor:        dto.idProveedor ?? null,
    };

    const actualizado = await this.productoRepository.actualizar(producto);

    if (!actualizado)
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
  }
}