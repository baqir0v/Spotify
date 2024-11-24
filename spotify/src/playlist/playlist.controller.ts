import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { AddMusicToPlaylistDto } from "./dto/add-to-playlist.dot";
import { ReorderPlaylistDto } from "./dto/reorder.dto";

@ApiTags("playlist")
@ApiBearerAuth('JWT-auth')
@Controller("playlist")
@UseGuards(AuthGuard)
export class PlaylistController {
    constructor(
        private playlistService: PlaylistService,
    ) { }

    @Get()
    findAll(@Query() params: PaginationUserDto) {
        return this.playlistService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.playlistService.findOne({ id })
    }

    @Get(":id/music")
    getPlaylistWithMusic(@Param("id") id:number){
        return this.playlistService.getPlaylistWithMusic(id)
    }

    @Post()
    create(@Body() body: CreatePlaylistDto) {
        return this.playlistService.create(body)
    }

    @Post(':id/add-music')
    async addMusicToPlaylist(
        @Param('id') playlistId: number,
        @Body() body: AddMusicToPlaylistDto,
    ) {
        return this.playlistService.addMusicToPlaylist(playlistId, body.musicIds, body.order);
    }
    

    @Post('reorder')
    async reorderMusicInPlaylist(@Body() body: ReorderPlaylistDto) {
        return this.playlistService.reorderMusicInPlaylist(body);
    }
    
}