import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "src/Entities/Playlist.entity";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Playlist])],
    controllers:[PlaylistController],
    providers:[PlaylistService],
    exports:[],
})
export class PlaylistModule{}