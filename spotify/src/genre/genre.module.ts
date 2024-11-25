import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genre } from "src/Entities/Genre.entity";
import { GenreService } from "./genre.service";
import { GenreController } from "./genre.controller";
import { UserModule } from "src/user/user.module";
import { ClsModule } from "nestjs-cls";

@Module({
    imports: [
        TypeOrmModule.forFeature([Genre]),
        UserModule,
        ClsModule
    ],
    controllers: [GenreController],
    providers: [GenreService],
    exports: [GenreService],
})
export class GenreModule { }