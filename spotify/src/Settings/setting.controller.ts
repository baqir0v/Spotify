import { Body, Controller, Get, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SettingService } from './setting.service';
import { Settings } from 'src/Entities/Setting.entity';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth('JWT-auth')
@ApiTags('Settings')
@UseGuards(AuthGuard)
@Controller('settings')
export class SettingController {
    constructor(private readonly settingsService: SettingService) {}

    @Get()
    async getSettings(): Promise<Settings> {
        return this.settingsService.getSetting();
    }

    @UseGuards(RolesGuard)
    @Put()
    @UseInterceptors(FileInterceptor('logo')) // Handles file upload for 'logo'
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Update settings with optional logo upload',
        schema: {
            type: 'object',
            properties: {
                siteName: { type: 'string' },
                aboutUs: { type: 'string' },
                contactDetails: { type: 'string' },
                logo: { type: 'string', format: 'binary' }, // File upload field
            },
        },
    })
    async updateSettings(
        @Body() updateData: UpdateSettingsDto,
        @UploadedFile() file: Express.Multer.File, // Handles uploaded file
    ) {
        return this.settingsService.updateSettings(updateData, file);
    }
}
