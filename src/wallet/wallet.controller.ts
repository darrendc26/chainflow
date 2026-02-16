import { Controller, Req, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
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
}
