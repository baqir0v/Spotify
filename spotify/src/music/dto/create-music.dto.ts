import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, Length } from "class-validator";

export class CreateMusicDto {
    @Type()
    @IsString()
    @Length(3, 100)
    @ApiProperty()
    title: string

    @Type()
    @IsString()
    @Length(3, 200)
    @ApiProperty()
    image: string

    @Type()
    @IsString()
    @Length(3, 500)
    @ApiProperty()
    song: string

    @Type(() => Number)
    @ApiProperty()
    user: number;

    @Type(() => Number)
    @ApiProperty()
    album: number;

    @IsArray()
    @Type(() => Number)
    @IsOptional()
    @ApiProperty()
    genre?: number[];
}