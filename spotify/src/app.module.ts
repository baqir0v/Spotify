import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "./config/config";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClsModule } from 'nestjs-cls';
import { AlbumModule } from './album/album.module';
import { MusicModule } from './music/music.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PassportModule } from '@nestjs/passport';
import { PlaylistModule } from './playlist/playlist.module';

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
    ClsModule.forRootAsync({
      useFactory: async () => ({
        global: true,
        middleware: { mount: true },
        // guard: { mount: true },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    AuthModule,
    AlbumModule,
    MusicModule,
    PlaylistModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
