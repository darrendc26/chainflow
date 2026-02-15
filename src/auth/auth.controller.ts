import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: RegisterDto) {
    return this.authService.login(userDto);
  }

  @Post('update')
  async update(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(updateAuthDto);
  }
}