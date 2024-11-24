import { Body, Controller, Get, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { MusicService } from "./music.service";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMusicDto } from "./dto/create-music.dto";
import { AuthGuard } from "src/guards/auth.guard";

@ApiBearerAuth('JWT-auth')
@ApiTags("music")
@UseGuards(AuthGuard)
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
                    // image: { type: 'string' },
                    song: { type: 'string', format: 'binary' },
                    // user: { type: 'number' },
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

    @Patch(':id/image') // Define the route with PATCH method for updating image
    @UseInterceptors(FileInterceptor('file')) // Interceptor for handling file uploads
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary', description: 'The new image file to upload' },
            },
        },
    })

    async changeImage(
        @Param('id') id: number, // Capture the music ID from the URL
        @UploadedFile() file: Express.Multer.File, // Capture the uploaded file
    ) {
        return this.musicService.changeImage(id, file); // Call the service function
    }
} 