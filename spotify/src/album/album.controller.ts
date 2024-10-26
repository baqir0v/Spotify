import { Controller, Get, Param, Query } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";

@ApiTags("album")
@Controller("album")
export class AlbumController{
    constructor(private albumService:AlbumService){}

    @Get()
    find(@Query() params:PaginationUserDto){
        return this.albumService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.albumService.findOne({ id })
    }
}