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
    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser) {
      return {
        "id": existingUser.id,
        "message": "User already exists"
      }
    }
    else {

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
        user: {
          id: user.id,
          email: userDto.email
        },
        accessToken,
        refreshToken,
      };
    };
  }

  async login(userDto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(userDto.password, existingUser.password);
      if (isPasswordCorrect) {
        let role = existingUser.role;
        let accessToken = this.jwtService.sign(
          {
            id: existingUser.id,
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
            id: existingUser.id,
            email: userDto.email,
            role: role,
          },
          {
            secret: process.env.JWT_REFRESH_TOKEN_SECRET,
            expiresIn: '7d',
          },
        );
        return {
          user: {
            id: existingUser.id,
            email: userDto.email
          },
          accessToken,
          refreshToken,
        };
      }
      else {
        throw new BadRequestException('Incorrect password');
      }
    }
  }

  async update(updateAuthDto: UpdateAuthDto) {
    // Check if user exists
    const existingUser = await this.userService.findByEmail(updateAuthDto.email);
    if (existingUser) {
      // Check if password is correct
      const isPasswordCorrect = await bcrypt.compare(updateAuthDto.password, existingUser.password);
      if (isPasswordCorrect) {
        // Update password
        const newPassword = await bcrypt.hash(updateAuthDto.newPassword, 12);
        const updatedUser = await this.userService.update(existingUser.id, {
          email: updateAuthDto.email,
          password: newPassword,
        });

        return {
          "id": existingUser.id,
          "message": "User updated"
        }
      } else {
        throw new BadRequestException('Incorrect password');
      }
    }
    else {
      throw new BadRequestException('Incorrect Credentials');
    }
  }
}

