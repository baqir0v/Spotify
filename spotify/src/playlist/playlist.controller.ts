import { Controller, Get, Param, Query } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";

@ApiTags("playlist")
@Controller("playlist")
export class PlaylistController{
    constructor(
        private playlistService:PlaylistService
    ){}

    @Get()
    findAll(@Query() params: PaginationUserDto) {
        return this.playlistService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.playlistService.findOne({ id })
    }
}