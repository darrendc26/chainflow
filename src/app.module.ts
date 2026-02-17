import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';
import { TransfersModule } from './transfers/transfers.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    WalletModule,
    TransfersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
