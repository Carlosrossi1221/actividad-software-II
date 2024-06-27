import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('mi-perfil')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProfileData() {
    // JTW es valido devolver el perfil
    return { mensaje: 'Todo funciona satisfactoriamente' };
  }
}
