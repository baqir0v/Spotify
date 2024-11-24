import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { RolesGuard } from "src/guards/roles.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("album")
@ApiBearerAuth('JWT-auth')
@Controller("album")
@UseGuards(AuthGuard)
export class AlbumController {
    constructor(private albumService: AlbumService) { }

    @Get()
    find(@Query() params: PaginationUserDto) {
        return this.albumService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.albumService.findOne({ id });
    }

    @Post()
    @UseInterceptors(FileInterceptor("image"))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                title: { type: "string" },
                image: { type: 'string', format: 'binary' },
                genre: { type: "number"}
            }
        }
    })
    async create(
        @Body() body: CreateAlbumDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.albumService.create(body, file)
    }

    @UseGuards(RolesGuard)
    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.albumService.remove(id)
    }
}