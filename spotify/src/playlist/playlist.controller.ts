import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { AddMusicToPlaylistDto } from "./dto/add-to-playlist.dot";


@ApiTags("playlist")
@ApiBearerAuth('JWT-auth')
@Controller("playlist")
@UseGuards(AuthGuard)
export class PlaylistController{
    constructor(
        private playlistService:PlaylistService,
    ){}

    @Get()
    findAll(@Query() params: PaginationUserDto) {
        return this.playlistService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.playlistService.findOne({ id })
    }

    @Post()
    create(@Body() body:CreatePlaylistDto){
        return this.playlistService.create(body)
    }

    @Post('add_music')
    async addMusicToPlaylist(@Body() body: AddMusicToPlaylistDto) {
        return this.playlistService.addMusicToPlaylist(body);
    }
}