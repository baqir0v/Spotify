import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "src/Entities/Album.entity";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { Genre } from "src/Entities/Genre.entity";
import { GenreModule } from "src/genre/genre.module";

@Module({
    imports:[TypeOrmModule.forFeature([Album,Genre]),GenreModule],
    controllers:[AlbumController],
    providers:[AlbumService],
    exports:[],
})
export class AlbumModule{}