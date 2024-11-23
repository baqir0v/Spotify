import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "src/Entities/Playlist.entity";
import { PlaylistService } from "./playlist.service";
import { PlaylistController } from "./playlist.controller";
import { ClsModule } from "nestjs-cls";
import { UserModule } from "src/user/user.module";
import { Music } from "src/Entities/Music.entity";
import { PlaylistMusic } from "src/Entities/PlaylistMusic.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Playlist,Music,PlaylistMusic]),
        ClsModule,
        UserModule
    ],
    controllers:[PlaylistController],
    providers:[PlaylistService],
    exports:[],
})
export class PlaylistModule{}