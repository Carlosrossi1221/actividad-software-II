import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rosscharr:%40Rossi12@rossi.pxp6xkx.mongodb.net/',
    ),
    UsersModule,
    AuthModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
