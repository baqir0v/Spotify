import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MusicService } from "./music.service";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";

@ApiTags("music")
@Controller("music")
export class MusicController {
    constructor(
        private musicService: MusicService
    ) { }

    @Get()
    findAll(@Query() params: PaginationUserDto) {
        return this.musicService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.musicService.findOne({id})
    }
} 