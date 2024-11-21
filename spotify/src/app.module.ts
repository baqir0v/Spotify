import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "./config/config";
import { UserModule } from './user/user.module';
import { User } from './Entities/User.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ClsModule } from 'nestjs-cls';
import { AlbumModule } from './album/album.module';
import { MusicModule } from './music/music.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: config.host,
      port: config.port,
      username: config.username,
      database: config.database,
      password: config.password,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      synchronize: true,
      logging: false
    }),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: { expiresIn: '10d' },
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      // guard: { mount: true },
    }),
    UserModule,
    AuthModule,
    AlbumModule,
    MusicModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
