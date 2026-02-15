import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    email: string;

    password: string;

    role: Role;
}

export enum Role {
    Admin = 'admin',
    User = 'user',
}