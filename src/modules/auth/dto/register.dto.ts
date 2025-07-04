import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, Matches } from "class-validator";
import { UserRole } from "src/global/type/user";

export class registerDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @Matches(/^[a-zA-Z0-9]{6,20}$/)
    password:string

}