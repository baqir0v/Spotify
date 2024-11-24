import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/Entities/User.entity";
import { ClsModule } from "nestjs-cls";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ClsModule,
        CloudinaryModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }