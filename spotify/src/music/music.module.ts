import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Music } from "src/Entities/Music.entity";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { GenreModule } from "src/genre/genre.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ClsModule } from "nestjs-cls";
import { UserModule } from "src/user/user.module";
import { Album } from "src/Entities/Album.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Music,Album]),
    MulterModule.register({
        storage:memoryStorage()
    }),
    GenreModule,CloudinaryModule,ClsModule,UserModule],
    providers:[MusicService],
    controllers:[MusicController],
    exports:[]
})
export class MusicModule{}