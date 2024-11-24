import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingsDto {
    @ApiProperty({ description: 'Site Name', example: 'My Awesome Site', required: false })
    @IsOptional()
    @IsString()
    siteName?: string;

    @ApiProperty({ description: 'About Us Information', example: 'About us content', required: false })
    @IsOptional()
    @IsString()
    aboutUs?: string;

    @ApiProperty({ description: 'Contact Details', example: 'Contact details content', required: false })
    @IsOptional()
    @IsString()
    contactDetails?: string;
}
