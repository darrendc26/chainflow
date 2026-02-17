import { PartialType } from '@nestjs/swagger';
import { CreateTransferDto } from './create-transfer.dto';
import { IsString } from 'class-validator';

export class TransferDto {
    @IsString()
    signature: string;
}
