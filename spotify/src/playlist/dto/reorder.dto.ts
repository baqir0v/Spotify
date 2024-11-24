import { IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class MusicOrder {
    @ApiProperty({ description: 'ID of the music', example: 2 })
    @IsInt()
    musicId: number;

    @ApiProperty({ description: 'Order position of the music', example: 1 })
    @IsInt()
    order: number;
}

export class ReorderPlaylistDto {
    @ApiProperty({ description: 'Playlist ID', example: 5 })
    @IsInt()
    playlistId: number;

    @ApiProperty({ description: 'Array of music IDs and their new order', type: [MusicOrder] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MusicOrder)
    musicOrder: MusicOrder[];
}
