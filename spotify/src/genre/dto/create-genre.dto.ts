import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, Length } from "class-validator"

export class CreateGenreDto{
    @Type()
    @IsString()
    @Length(1,50)
    @ApiProperty()
    genre_name: string
}