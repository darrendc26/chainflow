import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async register(userDto: RegisterDto) {
    console.log(userDto.email);
    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser) {
      console.log(userDto);
      console.log(existingUser);

      //   throw new BadRequestException('Email already registered');
      // }
      // else {
      console.log(userDto);

      const hashedPassword = await bcrypt.hash(userDto.password, 12);
      const user = await this.userService.create({
        email: userDto.email,
        password: hashedPassword,
        role: Role.User,
      });

      let role = Role.User;

      let accessToken = this.jwtService.sign(
        {
          id: user.id,
          email: userDto.email,
          role: role,
        },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: '15m',
        },
      );

      let refreshToken = this.jwtService.sign(
        {
          id: user.id,
          email: userDto.email,
          role: role,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: '7d',
        },
      );
      return {
        "id": 1,
        user: {
          id: user.id,
          email: userDto.email
        },
        accessToken,
        refreshToken,
      };
    };
  }
}


