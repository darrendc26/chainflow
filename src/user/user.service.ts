import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      return {
        "id": existingUser.id,
        "message": "User already exists"
      }
    }
    else {
      let db = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });

      let id = db.id;

      return {
        id: id,
      };
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findByEmail(email: string) {
    let id = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return id;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let password = updateUserDto.password;
    if (!password) {
      return {
        "message": "Password is required"
      }
    }
    let hashedPassword = await bcrypt.hash(password, 12);
    return this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        password: hashedPassword,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
