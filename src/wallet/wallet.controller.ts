import { Controller, Req, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { VerifyWalletDto } from './dto/verify-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { randomBytes } from 'crypto';
import { AuthRequest } from 'src/auth/auth-request';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @UseGuards(JwtAuthGuard)
  @Post('nonce')
  async getNonce(@Req() req: AuthRequest) {
    const user = req.user as any; // temporary cast
    return this.walletService.generateNonce(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verifyWallet(@Body() body: VerifyWalletDto, @Req() req: AuthRequest) {
    const user = req.user as any; // temporary cast
    return this.walletService.verifyWallet(user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWallet(@Req() req: AuthRequest) {
    const user = req.user as any; // temporary cast
    return this.walletService.getWallet(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('balance')
  async getBalance(@Req() req: AuthRequest) {
    const user = req.user as any; // temporary cast
    return this.walletService.getBalance(user.id);
  }
}
