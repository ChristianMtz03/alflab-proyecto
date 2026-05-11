import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString, IsNumber, IsOptional,
  MaxLength, Min
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El código de barra es obligatorio.' })
  @MaxLength(50, { message: 'El código no puede exceder 50 caracteres.' })
  codigoBarra: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio.' })
  @MaxLength(150, { message: 'El nombre no puede exceder 150 caracteres.' })
  nombreProducto: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'Las características no pueden exceder 300 caracteres.' })
  caracteristicas?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El precio es obligatorio.' })
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @Min(0, { message: 'El precio no puede ser negativo.' })
  precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'La cantidad es obligatoria.' })
  @IsNumber({}, { message: 'La cantidad debe ser un número.' })
  @Min(0, { message: 'La cantidad no puede ser negativa.' })
  cantidadExistencia: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: 'El ID del proveedor debe ser un número.' })
  idProveedor?: number;
}