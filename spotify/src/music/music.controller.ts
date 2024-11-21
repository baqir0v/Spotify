import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { MusicService } from "./music.service";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMusicDto } from "./dto/create-music.dto";


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
        return this.musicService.findOne({ id })
    }

    @Post("post")
    @UseInterceptors(FileInterceptor('song')) 
    @ApiConsumes('multipart/form-data') 
    @ApiBody({
        description: 'Upload a music file with metadata',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                image: { type: 'string' },
                song: { type: 'string', format: 'binary' },
                user: { type: 'number' },
                album: { type: 'number' },
                genre: { type: 'array', items: { type: 'number' } },
            },
        },
    })
    async create(
        @Body() createMusicDto: CreateMusicDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        console.log('Uploaded File:', file);
        console.log('Body:', createMusicDto);

        return this.musicService.create(createMusicDto, file);
    }
} 