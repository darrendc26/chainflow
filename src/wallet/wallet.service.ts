import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { randomBytes } from 'crypto';
@Injectable()
export class WalletService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async generateNonce(userId: number) {
    const nonce = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.prisma.nonce.upsert({
      where: { userId },
      update: {
        nonce,
        expiresAt,
      },
      create: {
        userId,
        nonce,
        expiresAt,
      },
    });

    return {
      message: `Sign this message to verify your wallet ownership.\nNonce: ${nonce}`,
    };
  }


}
