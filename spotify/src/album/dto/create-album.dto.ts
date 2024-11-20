import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsString, Length } from "class-validator"

export class CreateAlbumDto{
    @Type()
    @IsString()
    @Length(1,100)
    @ApiProperty()
    title: string

    @Type()
    @IsString()
    @Length(200)
    @ApiProperty()
    image: string

    @Type()
    @ApiProperty()
    @IsNumber()
    user:number
    
    @Type()
    @IsNumber()
    @ApiProperty()
    genre:number
}