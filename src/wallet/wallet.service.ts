import { Injectable } from '@nestjs/common';
import { VerifyWalletDto } from './dto/verify-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { randomBytes, Verify } from 'crypto';
import { ethers } from 'ethers';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JsonRpcProvider } from "ethers";

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
      message: `Sign this message to verify your wallet ownership.Nonce: ${nonce}`,
    };
  }

  async verifyWallet(userId: number, dto: VerifyWalletDto) {
    const nonceRecord = await this.prisma.nonce.findUnique({
      where: { userId },
    });

    if (!nonceRecord) {
      throw new BadRequestException('No active nonce');
    }

    if (nonceRecord.expiresAt < new Date()) {
      throw new BadRequestException('Nonce expired');
    }

    const message = `Sign this message to verify your wallet ownership.Nonce: ${nonceRecord.nonce}`;

    const recovered = ethers.verifyMessage(message, dto.signature);

    if (recovered.toLowerCase() !== dto.address.toLowerCase()) {
      throw new UnauthorizedException('Invalid signature');
    }

    // store wallet
    await this.prisma.wallet.upsert({
      where: { userId },
      update: {
        address: dto.address,
      },
      create: {
        userId,
        address: dto.address,
      },
    });

    // delete nonce
    await this.prisma.nonce.delete({
      where: { userId },
    });

    return { message: 'Wallet verified successfully' };
  }

  async getBalance(userId: number) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }
    const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    console.log(provider.estimateGas({
      from: wallet.address,
      to: wallet.address,
      value: "0.01",
    }));
    let balance = await provider.getBalance(wallet.address);
    return { balance: balance.toString() };
  }

  async getWallet(userId: number) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new BadRequestException('Wallet not found');
    }

    return { address: wallet.address };
  }

}
