import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {

    @ApiProperty({ example: "darren@email.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "StrongPass123", minLength: 8 })
    @IsString()
    @MinLength(8)
    password: string;
}
