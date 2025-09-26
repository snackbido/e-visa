/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Get, Ip, Post, Query } from '@nestjs/common';
import { PaymentService } from '@visa/payment/payment.service';
import { PaymentDto } from '@visa/payment/dto/payment.dto';
import { Payment } from '@visa/payment/entity/payment.entity';

@Controller('/api/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  async getAll(): Promise<Payment[]> {
    return await this.paymentService.getPayments();
  }

  @Get('checkout')
  createPayment(@Ip() ip: string, @Query() query: any) {
    const amount = Number(query.amount); // default 25k VND
    const orderInfo = query.orderInfo;
    const clientIp = ip || '127.0.0.1';
    return this.paymentService.buildPaymentUrl({ amount, orderInfo, clientIp });
  }

  @Get('return')
  handleReturn(@Query() query: any) {
    return this.paymentService.handleReturn(query);
  }

  @Post('ipn')
  handleIpn(@Body() body, @Query() query) {
    const params = { ...query, ...body };

    return this.paymentService.handleIpn(params);
  }

  @Post()
  async create(@Body() paymentDto: PaymentDto): Promise<string> {
    return await this.paymentService.createPayment(paymentDto);
  }
}
