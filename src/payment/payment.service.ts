import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from '@visa/repository/payment.repository';
import { PaymentDto } from '@visa/payment/dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
  ) {}

  async createPayment(paymentDto: PaymentDto): Promise<string> {
    const { amount, user_id } = paymentDto;

    const payment = this.paymentRepository.create({ amount, user_id });

    await this.paymentRepository.save(payment);

    return 'Payment created';
  }
}
