import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { PaginationGenreDto } from "./dto/pagination-genre.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { RolesGuard } from "src/guards/roles.guard";
import { AuthGuard } from "src/guards/auth.guard";

@ApiBearerAuth('JWT-auth')
@ApiTags("Genre")
@Controller("Genre")
@UseGuards(AuthGuard)
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

    @UseGuards(RolesGuard)
    @Delete(":id")
    delete(@Param("id") id:number){
        return this.genreService.delete(id)
    }
}