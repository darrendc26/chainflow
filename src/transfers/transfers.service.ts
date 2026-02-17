import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferDto } from './dto/transfer.dto';
import { JsonRpcProvider, ethers } from 'ethers';
import { PrismaService } from 'prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class TransfersService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async getEstimate(dto: CreateTransferDto) {
    const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const gas = await provider.estimateGas({
      from: dto.from,
      to: dto.to,
      value: dto.amount,
    });
    const amount = ethers.parseUnits("100000000000000000", 0);
    const total = amount + gas;
    return {
      gas: gas.toString(),
      amount: amount.toString(),
      total: total.toString()
    };
  }

  async transfer(dto: TransferDto, userId: number) {

    if (!dto.signature || typeof dto.signature !== "string") {
      throw new BadRequestException("Signed transaction missing");
    }

    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new BadRequestException("Wallet not found");
    }

    const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    // Decode BEFORE broadcast
    const tx = ethers.Transaction.from(dto.signature);

    if (tx.from?.toLowerCase() !== wallet.address.toLowerCase()) {
      throw new BadRequestException("Incorrect signer");
    }

    const txResponse = await provider.broadcastTransaction(dto.signature);

    const receipt = await txResponse.wait();
    const db = this.prisma.transfer.create({
      data: {
        userId,
        from: tx.from,
        to: tx.to,
        amount: tx.value.toString(),
        createdAt: new Date(),
      },
    });
    return {
      txHash: receipt?.hash,
      gas: receipt?.gasUsed.toString(),
      fee: receipt?.fee?.toString(),
      blockNumber: receipt?.blockNumber.toString(),
      status: receipt?.status === 1 ? "success" : "failed",
    };
  }

}