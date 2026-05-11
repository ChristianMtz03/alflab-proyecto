import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @IsEmail({}, { message: 'El formato del email no es válido.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  password: string;
}