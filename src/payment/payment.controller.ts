import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from '@visa/payment/payment.service';
import { PaymentDto } from '@visa/payment/dto/payment.dto';

@Controller('/api/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async create(@Body() paymentDto: PaymentDto): Promise<string> {
    return await this.paymentService.createPayment(paymentDto);
  }
}
