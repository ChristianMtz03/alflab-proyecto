import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateEstatusDto {
  @ApiProperty({ enum: ['Pendiente', 'Aprobada', 'Cancelada'] })
  @IsNotEmpty({ message: 'El estatus es obligatorio.' })
  @Matches(/^(Pendiente|Aprobada|Cancelada)$/, {
    message: 'El estatus debe ser Pendiente, Aprobada o Cancelada.',
  })
  estatus: string;
}