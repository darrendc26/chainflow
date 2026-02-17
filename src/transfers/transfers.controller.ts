import { Controller, Req, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferDto } from './dto/transfer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Auth } from 'src/auth/entities/auth.entity';
import { AuthRequest } from 'src/auth/auth-request';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) { }

  @Post('estimate')
  async getEstimate(@Body() dto: CreateTransferDto) {
    return this.transfersService.getEstimate(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  async transfer(@Body() dto: TransferDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.transfersService.transfer(dto, userId);
  }
}
