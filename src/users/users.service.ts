import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const encriptarclave = await bcrypt.hash(createUserDto.contraseña, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      contraseña: encriptarclave,
    });
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(usuario: string): Promise<User> {
    return this.userModel.findOne({ usuario });
  }
}
