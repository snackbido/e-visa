/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import bull from 'bull';
import { Payment } from '@visa/payment/entity/payment.entity';

interface PaymentEventPayload {
  transaction: Payment;
  orderInfo: string;
}

@Injectable()
export class PaymentListener {
  private readonly logger = new Logger(PaymentListener.name);

  constructor(
    @InjectQueue('mail-queue') private readonly mailQueue: bull.Queue,
  ) {}

  @OnEvent('payment.success')
  async handlePaymentSuccess(payload: PaymentEventPayload): Promise<void> {
    const { transaction } = payload;

    this.logger.log(
      `Bắt được sự kiện thanh toán thành công cho mã GD: ${transaction.payment_id}`,
    );

    await this.mailQueue.add('send-success-mail', payload, {
      attempts: 3,
      backoff: 5000,
      removeOnComplete: true,
    });
  }

  @OnEvent('payment.fail')
  async handlePaymentFail(payload: PaymentEventPayload): Promise<void> {
    const { transaction } = payload;

    this.logger.log(
      `Bắt được sự kiện thanh toán thất bại cho mã GD: ${transaction.payment_id}`,
    );

    await this.mailQueue.add('send-fail-mail', payload, {
      attempts: 3,
      backoff: 5000,
      removeOnComplete: true,
    });
  }
}
