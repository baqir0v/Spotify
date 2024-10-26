import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "src/Entities/Album.entity";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Album])],
    controllers:[AlbumController],
    providers:[AlbumService],
    exports:[],
})
export class AlbumModule{}