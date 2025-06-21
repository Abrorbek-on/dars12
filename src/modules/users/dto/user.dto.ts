import { ApiProperty } from '@nestjs/swagger';
import {
    IsAlpha,
    IsNotEmpty,
    IsNumber,
    Length,
    Max,
    Min,
  } from 'class-validator';
  
  export class UserDto {
    @ApiProperty()
    @IsAlpha()
    @Length(2, 25)
    @IsNotEmpty()
    username: string;
  
    @ApiProperty()
    @IsNumber()
    @Max(100)
    @Min(18)
    age: number;
  }
  