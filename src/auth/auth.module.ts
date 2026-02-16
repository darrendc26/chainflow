import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, // 👈 VERY IMPORTANT
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        signOptions: { expiresIn: '15m' },
      }),
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
