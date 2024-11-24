import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "src/Entities/Album.entity";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";
import { Genre } from "src/Entities/Genre.entity";
import { GenreModule } from "src/genre/genre.module";
import { ClsModule } from "nestjs-cls";
import { UserModule } from "src/user/user.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Album, Genre]),
        GenreModule,
        ClsModule,
        UserModule,
        CloudinaryModule
    ],
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService],
})
export class AlbumModule { }