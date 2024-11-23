import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class MusicOrder {
    @ApiProperty({ description: 'ID of the music', example: 1 })
    @IsInt()
    musicId: number;

    @ApiProperty({ description: 'Order of the music in the playlist', example: 2 })
    @IsInt()
    order: number;
}

export class ReorderPlaylistDto {
    @ApiProperty({ description: 'ID of the playlist to reorder', example: 3 })
    @IsInt()
    playlistId: number;

    @ApiProperty({
        description: 'Array of music IDs and their new order',
        type: [MusicOrder],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MusicOrder)
    musicOrder: MusicOrder[];
}
