import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('entrar')
  async login(
    @Body('usuario') usuario: string,
    @Body('contraseña') contraseña: string,
  ) {
    try {
      return this.authService.login(usuario, contraseña);
    } catch (error) {
      throw new UnauthorizedException(
        'no existe o hay un error en sus credenciales',
      );
    }
  }
}
