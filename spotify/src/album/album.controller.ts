import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { RolesGuard } from "src/guards/roles.guard";
import { AuthGuard } from "src/guards/auth.guard";

@ApiTags("album")
@ApiBearerAuth('JWT-auth')
@Controller("album")
@UseGuards(AuthGuard)
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

    @UseGuards(RolesGuard)
    @Delete(":id")
    remove(@Param("id") id:number){
        return this.albumService.remove(id)
    }
}