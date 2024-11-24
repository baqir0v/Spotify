import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsString, Length } from "class-validator"

export class CreateAlbumDto{
    @Type()
    @IsString()
    @Length(1,100)
    @ApiProperty()
    title: string

    @ApiProperty({ type: 'string', format: 'binary'})
    image: any;

    // @Type()
    // @ApiProperty()
    // @IsNumber()
    // user:number
    
    @Type()
    @IsNumber()
    @ApiProperty()
    genre:number
}