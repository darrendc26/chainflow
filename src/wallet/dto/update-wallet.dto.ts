import { PartialType } from '@nestjs/mapped-types';
import { VerifyWalletDto } from './verify-wallet.dto';

export class UpdateWalletDto extends PartialType(VerifyWalletDto) { }
