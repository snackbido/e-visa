import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  async create(@Body() paymentDto: PaymentDto): Promise<string> {
    return await this.paymentService.createPayment(paymentDto);
  }
}
