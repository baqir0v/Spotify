import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsString, Length, MaxDate } from "class-validator";
import * as dateFns from 'date-fns';
import { UserRole } from "src/shared/enum/user.enum";

export class CreateUserDto {
    @Type()
    @IsString()
    @Length(3, 100)
    @ApiProperty()
    userName: string;

    @Type()
    @IsString()
    @Length(3, 50)
    @ApiProperty()
    nickName: string;

    @Type()
    @IsEmail()
    @ApiProperty()
    email: string;

    @Type()
    @IsString()
    @Length(3, 50)
    @ApiProperty()
    password: string;

    @Type()
    @IsString()
    @ApiProperty({default:"https://res.cloudinary.com/dj1tjerlk/image/upload/v1721132578/user/sm3ldanphpvsfkz0urha.jpg"})
    image:string

    @Type()
    @IsBoolean()
    @ApiProperty({default:false})
    isOnline:boolean

    @Type()
    @IsDate()
    @MaxDate(() => dateFns.add(new Date(), { years: -10 }), {
        message: 'You are too young',
    })
    @ApiProperty()
    birthDate: Date;

    @Type()
    @IsBoolean()
    @ApiProperty()
    gender: boolean;

    @Type()
    @IsEnum(UserRole, { each: true })
    @ApiProperty({ default: [UserRole.USER] })
    role: UserRole[];
}