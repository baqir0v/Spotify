import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Music } from "src/Entities/Music.entity";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { GenreModule } from "src/genre/genre.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

@Module({
    imports:[TypeOrmModule.forFeature([Music]),
    MulterModule.register({
        storage:memoryStorage()
    }),
    GenreModule,CloudinaryModule],
    providers:[MusicService],
    controllers:[MusicController],
    exports:[]
})
export class MusicModule{}