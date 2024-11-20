import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserService } from "src/user/user.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { ClsService } from "nestjs-cls";
import { User } from "src/Entities/User.entity";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private cls: ClsService
    ) { }

    async register(params: CreateUserDto) {
        let newPassword = await bcrypt.hash(params.password, 10)
        const user = await this.userService.create({ ...params, password: newPassword })
        return user
    }

    async login(params: LoginUserDto) {
        let user = await this.userService.findOne({ email: params.email })

        if (!user) throw new NotFoundException("User doesnt exist")

        const checkPassword = await bcrypt.compare(params.password, user.password)
        if (!checkPassword) throw new HttpException("Password is not correct", 404)

        this.cls.set('user', user);

        const me1 = this.cls.get<User>("user")
        console.log(me1);

        let token = this.jwtService.sign({ userId: user.id })

        return {
            token
        }
    }
}