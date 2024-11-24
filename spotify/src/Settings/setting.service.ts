import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Settings } from "src/Entities/Setting.entity";
import { Repository } from "typeorm";
import { UpdateSettingsDto } from "./dto/update-settings.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class SettingService {
    constructor(
        @InjectRepository(Settings)
        private readonly settingsRepo: Repository<Settings>,
        private cloudinaryService: CloudinaryService
    ) { }

    async getSetting() {
        const settings = await this.settingsRepo.findOne({where:{id:1}})
        if (!settings) throw new NotFoundException("Settings not found")

        return settings
    }

    async updateSettings(updateData: Partial<Settings>, file?: Express.Multer.File) {
        let settings = await this.settingsRepo.findOne({where:{id:1}});
        if (!settings) {
            settings = this.settingsRepo.create();
        }

        if (file) {
            const uploadResult = await this.cloudinaryService.uploadFile(file.buffer);
            settings.logo = uploadResult.secure_url;
        }

        Object.assign(settings, updateData);
        return this.settingsRepo.save(settings);
    }
}