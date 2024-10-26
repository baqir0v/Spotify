import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {
    @Type()
    @IsEmail()
    @ApiProperty()
    email:string
    @Type()
    @IsString()
    @Length(3, 150)
    @ApiProperty()
    password: string;
}