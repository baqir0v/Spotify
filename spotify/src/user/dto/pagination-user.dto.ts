import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationUserDto{
    @Type()
    @IsNumber()
    @IsOptional()
    @ApiProperty({default:0})
    skip:number
    @Type()
    @IsNumber()
    @IsOptional()
    @ApiProperty({default:0})
    limit:number
}