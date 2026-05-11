import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegistroUseCase } from './application/use-cases/registro.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegistroDto } from './application/dto/registro.dto';
import { LoginDto } from './application/dto/login.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly registroUseCase: RegistroUseCase,
    private readonly loginUseCase:    LoginUseCase,
  ) {}

  @Post('registro')
  @HttpCode(HttpStatus.OK)
  async registro(@Body() dto: RegistroDto) {
    return this.registroUseCase.execute(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
}