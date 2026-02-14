import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() userDto: RegisterDto) {
    console.log('RAW BODY:', userDto.email); // 👈 add this
    console.log('RAW BODY:', userDto.password); // 👈 add this
    return this.authService.register(userDto);
  }
}