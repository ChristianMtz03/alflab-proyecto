import { Inject, Injectable } from '@nestjs/common';
import { IProductoRepository } from '../../domain/interfaces/producto.repository.interface';
import { CreateProductoDto } from '../dto/create-producto.dto';

@Injectable()
export class CreateProductoUseCase {
  constructor(
    @Inject(IProductoRepository)
    private readonly productoRepository: IProductoRepository,
  ) {}

  async execute(dto: CreateProductoDto): Promise<{ id: number }> {
    const producto = {
      idProducto:         0,
      codigoBarra:        dto.codigoBarra,
      nombreProducto:     dto.nombreProducto,
      caracteristicas:    dto.caracteristicas ?? null,
      precio:             dto.precio,
      cantidadExistencia: dto.cantidadExistencia,
      idProveedor:        dto.idProveedor ?? null,
    };

    const id = await this.productoRepository.crear(producto);
    return { id };
  }
}