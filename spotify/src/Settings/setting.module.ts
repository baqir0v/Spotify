import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Settings } from "src/Entities/Setting.entity";
import { SettingController } from "./setting.controller";
import { SettingService } from "./setting.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { UserModule } from "src/user/user.module";
import { ClsModule } from "nestjs-cls";

@Module({
    imports:[
        TypeOrmModule.forFeature([Settings]),
        CloudinaryModule,
        UserModule,
        ClsModule
    ],
    controllers:[SettingController],
    providers:[SettingService],
    exports:[]
})
export class SettingModule{}