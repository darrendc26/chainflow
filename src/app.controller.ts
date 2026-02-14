import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


/*
POST /auth/register
P/POST /auth/login
POST /auth/refresh
GET /auth/me
POST /wallet/nonce
POST /wallet/verify
GET /wallet
GET /wallet/balance
POST /transfers
GET /transfers/:id
GET /transfers?user=:user
GET /admin/transfers
GET /admin/metrics


*/