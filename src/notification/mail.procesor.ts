/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import bull from 'bull';
import { Payment } from '@visa/payment/entity/payment.entity';
import { EmailService } from '@visa/utils/email/email.service';

@Processor('mail-queue')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private readonly emailService: EmailService) {}

  @Process('send-success-mail')
  async handleSendSuccessMail(
    job: bull.Job<{ transaction: Payment; orderInfo: string }>,
  ) {
    const { transaction } = job.data;

    this.logger.log(
      `[Bắt đầu] Đang gửi email thành công cho GD: ${transaction.payment_id}`,
    );

    try {
      await this.emailService.sendPaymentSuccessEmail(transaction);

      this.logger.log(
        `[Thành công] Email đã gửi cho GD: ${transaction.payment_id}`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `[Thất bại] Lỗi gửi email GD ${transaction.payment_id}`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }

  @Process('send-fail-mail')
  async handleSendFailMail(
    job: bull.Job<{ transaction: Payment; orderInfo: string }>,
  ) {
    const { transaction } = job.data;

    try {
      await this.emailService.sendPaymentFailedEmail(transaction);
      this.logger.log(
        `[Thành công] Email báo lỗi đã gửi cho GD: ${transaction.payment_id}`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `[Thất bại] Lỗi gửi mail báo lỗi GD ${transaction.payment_id}`,
      );
      throw error;
    }
  }
}
