import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config/config";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: config.jwtSecret,
            signOptions: { expiresIn: '10d' },
          }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [],
})
export class AuthModule { }