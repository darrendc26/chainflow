import { IsEthereumAddress, IsString } from "class-validator";

export class CreateTransferDto {
    @IsEthereumAddress()
    from: string;

    @IsEthereumAddress()
    to: string;

    @IsString()
    amount: string;
}
