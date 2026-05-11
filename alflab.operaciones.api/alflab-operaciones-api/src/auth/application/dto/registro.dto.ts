import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistroDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio.' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres.' })
  nombreUsuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @IsEmail({}, { message: 'El formato del email no es válido.' })
  @MaxLength(150, { message: 'El email no puede exceder 150 caracteres.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @Matches(/[A-Z]/, { message: 'La contraseña debe contener al menos una mayúscula.' })
  @Matches(/[a-z]/, { message: 'La contraseña debe contener al menos una minúscula.' })
  @Matches(/\d/, { message: 'La contraseña debe contener al menos un número.' })
  @Matches(/[^a-zA-Z\d]/, { message: 'La contraseña debe contener al menos un carácter especial.' })
  password: string;

  @ApiProperty({ enum: ['Administrador', 'Empleado'] })
  @IsNotEmpty({ message: 'El rol es obligatorio.' })
  @Matches(/^(Administrador|Empleado)$/, { message: 'El rol debe ser Administrador o Empleado.' })
  rol: string;
}