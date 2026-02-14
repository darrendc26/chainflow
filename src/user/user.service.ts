import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) { }

  create(createUserDto: CreateUserDto) {
    // TODO: Push to DB
    let id = 1;

    return {
      id: id,
    };

  }

  findAll() {
    return `This action returns all user`;
  }

  findByEmail(email: string) {
    return `This action returns a user by email ${email}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
