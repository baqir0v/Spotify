import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddMusicToPlaylistDto {
    @Type(() => Number)
    @IsNumber()
    @ApiProperty()
    playlistId: number; 

    @Type(() => Number)
    @IsArray()
    @IsNumber({}, { each: true }) 
    @ApiProperty({type:[Number]})
    musicIds: number[]; 
}
