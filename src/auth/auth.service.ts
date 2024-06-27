import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usuario: string, contraseña: string): Promise<User> {
    const user = await this.usersService.findOne(usuario);
    if (!user) {
      return null;
    }
    const iscontraseñaCorrect = await bcrypt.compare(
      contraseña,
      user.contraseña,
    );

    if (iscontraseñaCorrect) {
      return user;
    }
    return null;
  }

  async login(usuario: string, contraseña: string) {
    const user = await this.validateUser(usuario, contraseña);
    if (!user) {
      throw new UnauthorizedException(
        'Las credenciales no son correctas. Inténtelo de nuevo.',
      );
    }

    const payload = { usuario: user.usuario, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
