import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto {
    @ApiProperty({ example: "darren@email.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "StrongPass123", minLength: 8 })
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: "StrongPass123", minLength: 8 })
    @IsString()
    @MinLength(8)
    newPassword: string;
}