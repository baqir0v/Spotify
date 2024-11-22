import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "./dto/login-user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController{
    constructor( private authService:AuthService){}

    @Get()
    log(){
        return this.authService.log()
    }

    @Post("register")
    register(@Body() body:CreateUserDto){
        return this.authService.register(body)
    }

    @Post("login")
    login(@Body() body:LoginUserDto){
        return this.authService.login(body)
    }
}