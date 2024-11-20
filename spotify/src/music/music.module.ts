import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Music } from "src/Entities/Music.entity";
import { MusicService } from "./music.service";
import { MusicController } from "./music.controller";
import { GenreModule } from "src/genre/genre.module";

@Module({
    imports:[TypeOrmModule.forFeature([Music]),GenreModule],
    providers:[MusicService],
    controllers:[MusicController],
    exports:[]
})
export class MusicModule{}