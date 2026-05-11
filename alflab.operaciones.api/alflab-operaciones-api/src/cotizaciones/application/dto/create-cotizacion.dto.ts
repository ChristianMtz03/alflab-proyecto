import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsArray,
  ValidateNested, Min, ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDetalleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El ID del producto es obligatorio.' })
  @IsNumber({}, { message: 'El ID del producto debe ser un número.' })
  idProducto: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La cantidad es obligatoria.' })
  @IsNumber({}, { message: 'La cantidad debe ser un número.' })
  @Min(1, { message: 'La cantidad mínima es 1.' })
  cantidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El precio unitario es obligatorio.' })
  @IsNumber({}, { message: 'El precio unitario debe ser un número.' })
  @Min(0, { message: 'El precio unitario no puede ser negativo.' })
  precioUnitario: number;
}

export class CreateCotizacionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El ID del cliente es obligatorio.' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número.' })
  idCliente: number;

  @ApiProperty({ type: [CreateDetalleDto] })
  @IsArray({ message: 'Los detalles deben ser un arreglo.' })
  @ArrayMinSize(1, { message: 'La cotización debe tener al menos un producto.' })
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleDto)
  detalles: CreateDetalleDto[];
}