import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { PaginationUserDto } from "./dto/pagination-user.dto";

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    findAll(@Query() params: PaginationUserDto) {
        return this.userService.findAll(params)
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.userService.findOne({ id })
    }
}