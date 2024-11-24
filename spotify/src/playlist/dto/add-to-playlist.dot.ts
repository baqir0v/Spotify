import { IsArray, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AddMusicToPlaylistDto {
    @ApiProperty({
        type: [Number],
        description: 'Array of Music IDs to add to the playlist',
        example: [2, 3, 4],
    })
    @IsArray()
    @Type(() => Number)
    @IsNumber({}, { each: true })
    musicIds: number[];

    @ApiProperty({
        type: [Number],
        description: 'Optional order for the music IDs',
        required: false,
        example: [1, 2, 3],
    })
    @IsArray()
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { each: true })
    order?: number[];
}
