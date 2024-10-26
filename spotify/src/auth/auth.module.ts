import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";

@Module({
    imports:[UserModule],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[],
})
export class AuthModule{}