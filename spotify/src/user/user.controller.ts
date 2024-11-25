import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "./dto/pagination-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { SuperAdminGuard } from "src/guards/superadmin.guard";

@ApiBearerAuth('JWT-auth')
@ApiTags('user')
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(RolesGuard)
    @Get()
    findAll(@Query() params: PaginationUserDto) {
        return this.userService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.userService.findOne({ id })
    }

    @Put('change-image')
    @UseInterceptors(FileInterceptor('file')) 
    @ApiConsumes('multipart/form-data') 
    @ApiBody({
        description: 'Change user image',
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' }, 
            },
        },
    })
    async changeImage(
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.userService.changeImage(file);
    }

    @UseGuards(RolesGuard)
    @Patch(':id/changerole')
    async changeRole(@Param('id') id: number) {
        return this.userService.changerole(id);
    }

    @UseGuards(SuperAdminGuard)
    @Delete(":id")
    remove(@Param("id") id:number){
        return this.userService.delete(id)
    }
}