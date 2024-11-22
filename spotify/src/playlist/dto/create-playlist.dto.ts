import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {
    @Type()
    @IsString()
    @ApiProperty()
    name: string

    @Type()
    @IsString()
    @ApiProperty()
    description: string

    @Type()
    @ApiProperty()
    @IsNumber()
    user: number

    @Type(() => String)
    @IsArray()
    @ApiProperty()
    music: string[]
}