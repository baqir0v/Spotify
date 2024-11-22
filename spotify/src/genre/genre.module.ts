import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genre } from "src/Entities/Genre.entity";
import { GenreService } from "./genre.service";
import { GenreController } from "./genre.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    controllers: [GenreController],
    providers: [GenreService],
    exports: [GenreService],
})
export class GenreModule { }