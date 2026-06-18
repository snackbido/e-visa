import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Payment } from '@visa/payment/entity/payment.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  private wrapTemplate(title: string, content: string): string {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 22px;">${title}</h1>
        </div>
        ${content}
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #9CA3AF;">
            &copy; ${new Date().getFullYear()} Book247 | Support: (+84) 28 88 852 247
        </div>
    </div>`;
  }

  // 2. Các hàm gửi cụ thể
  async sendPaymentSuccessEmail(payment: Payment) {
    const title = 'Payment Successful!';
    const content = `
        <p>Hi <b>${payment.user.first_name}</b>,</p>
        <p>Your payment for Visa ID <b>${payment.visa_id}</b> has been processed successfully.</p>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
            <p>Amount: <b>${payment.amount} VND</b></p>
            <p>Transaction ID: ${payment.payment_id}</p>
        </div>`;

    await this.sendEmail(
      payment.user.email,
      title,
      this.wrapTemplate(title, content),
    );
  }

  async sendPaymentCanceledEmail(payment: Payment) {
    const title = 'Payment Canceled';
    const content = `<p>Hi ${payment.user.first_name}, your payment for Visa ${payment.visa_id} has been canceled.</p>`;
    await this.sendEmail(
      payment.user.email,
      title,
      this.wrapTemplate(title, content),
    );
  }

  async sendPaymentFailedEmail(payment: Payment) {
    const title = 'Payment Failed';
    const content = `<p>Hi ${payment.user.first_name}, we couldn't process your payment. Please try again.</p>`;
    await this.sendEmail(
      payment.user.email,
      title,
      this.wrapTemplate(title, content),
    );
  }

  async sendPaymentExpiredEmail(payment: Payment) {
    const title = 'Payment Expired';
    const content = `<p>Hi ${payment.user.first_name}, your payment session for Visa ${payment.visa_id} has expired.</p>`;
    await this.sendEmail(
      payment.user.email,
      title,
      this.wrapTemplate(title, content),
    );
  }

  async sendEmail(to: string, subject: string, context: string) {
    await this.mailerService.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: context,
    });
  }
}
