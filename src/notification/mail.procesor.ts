import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import bull from 'bull';
import { Payment } from '@visa/payment/entity/payment.entity';
import { EmailService } from '@visa/utils/email/email.service';
import { VisaService } from '@visa/visa/visa.service';
import { VISA_STATUS } from '@visa/visa/entity/visa.entity';

@Processor('mail-queue')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(
    private readonly emailService: EmailService,
    private visaService: VisaService,
  ) {}

  @Process('send-success-mail')
  async handleSendSuccessMail(
    job: bull.Job<{ payment: Payment; orderInfo: string }>,
  ) {
    const { payment } = job.data;
    this.logger.log(
      `[Bắt đầu] Đang gửi email thành công cho GD: ${payment.payment_id}`,
    );

    try {
      await this.emailService.sendPaymentSuccessEmail(payment);
      await this.visaService.update(payment.visa_id, {
        is_active: '1',
        status: VISA_STATUS.WAIT,
      });
      this.logger.log(
        `[Thành công] Email đã gửi cho GD: ${payment.payment_id}`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `[Thất bại] Lỗi gửi email GD ${payment.payment_id}`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }

  @Process('send-fail-mail')
  async handleSendFailMail(
    job: bull.Job<{ payment: Payment; orderInfo: string }>,
  ) {
    const { payment } = job.data;
    try {
      await this.emailService.sendPaymentFailedEmail(payment);
      await this.visaService.update(payment.visa_id, {
        is_active: '1',
        status: VISA_STATUS.UNPAID,
      });
      this.logger.log(
        `[Thành công] Email báo lỗi đã gửi cho GD: ${payment.payment_id}`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `[Thất bại] Lỗi gửi mail báo lỗi GD ${payment.payment_id}`,
      );
      throw error;
    }
  }

  @Process('send-cancel-mail')
  async handleSendCancelMail(
    job: bull.Job<{ payment: Payment; orderInfo: string }>,
  ) {
    const { payment } = job.data;
    try {
      await this.emailService.sendPaymentCanceledEmail(payment);
      await this.visaService.update(payment.visa_id, {
        is_active: '1',
        status: VISA_STATUS.UNPAID,
      });
      this.logger.log(
        `[Thành công] Email báo lỗi đã gửi cho GD: ${payment.payment_id}`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `[Thất bại] Lỗi gửi mail báo lỗi GD ${payment.payment_id}`,
      );
      throw error;
    }
  }

  @Process('send-expired-mail')
  async handleSendExpiredMail(
    job: bull.Job<{ payment: Payment; orderInfo: string }>,
  ) {
    const { payment } = job.data;
    try {
      await this.emailService.sendPaymentExpiredEmail(payment);
      await this.visaService.update(payment.visa_id, {
        is_active: '1',
        status: VISA_STATUS.UNPAID,
      });
      this.logger.log(
        `[Thành công] Email báo lỗi đã gửi cho GD: ${payment.payment_id}`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `[Thất bại] Lỗi gửi mail báo lỗi GD ${payment.payment_id}`,
      );
      throw error;
    }
  }
}
