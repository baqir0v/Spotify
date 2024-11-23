import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddMusicToPlaylistDto {
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ description: 'Playlist ID', example: 1 })
    playlistId: number;

    @Type(() => Number)
    @IsArray()
    @IsNumber({}, { each: true })
    @ApiProperty({
        type: [Number],
        description: 'Array of Music IDs to add to the playlist',
        example: [2, 3, 4],
    })
    musicIds: number[];

    @Type(() => Number)
    @IsArray()
    @IsOptional()
    @IsNumber({}, { each: true })
    @ApiProperty({
        type: [Number],
        description: 'Optional order for the music IDs',
        required: false,
        example: [1, 2, 3],
    })
    order?: number[];
}
