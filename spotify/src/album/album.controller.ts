import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { CreateAlbumDto } from "./dto/create-album.dto";

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

    @Post()
    create(@Body() body:CreateAlbumDto){
        return this.albumService.create(body)
    }

    @Delete(":id")
    remove(@Param("id") id:number){
        return this.albumService.remove(id)
    }
}