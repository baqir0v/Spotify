import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { PaginationGenreDto } from "./dto/pagination-genre.dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateGenreDto } from "./dto/create-genre.dto";

@ApiTags("Genre")
@Controller("Genre")
export class GenreController {
    constructor(
        private genreService: GenreService
    ) { }

    @Get()
    findAll(@Query() params: PaginationGenreDto) {
        return this.genreService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.genreService.findOne({ id })
    }

    @Post()
    create(@Body() body:CreateGenreDto){
        return  this.genreService.create(body)
    }
}