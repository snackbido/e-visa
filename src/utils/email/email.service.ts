import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Payment } from '@visa/payment/entity/payment.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  private getClientUrl() {
    return process.env.CLIENT_URL || 'https://Evisa.com';
  }

  private createInfoBlock(items: { label: string; value: string }[]) {
    return `
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-top:20px;">
        ${items
          .map(
            (item) =>
              `<tr>
                <td style="padding:10px 0; font-size:14px; color:#475569;">${item.label}</td>
                <td style="padding:10px 0; font-size:14px; color:#0f172a; text-align:right;">${item.value}</td>
              </tr>`,
          )
          .join('')}
      </table>`;
  }

  private wrapTemplate(
    title: string,
    subtitle: string,
    content: string,
    actionText?: string,
    actionUrl?: string,
  ): string {
    const cta =
      actionText && actionUrl
        ? `<tr>
            <td style="padding-top: 32px; text-align: center;">
              <a href="${actionUrl}" target="_blank" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 28px; border-radius:999px; font-weight:600; letter-spacing:0.2px;">${actionText}</a>
            </td>
          </tr>`
        : '';

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6fb;">
    <span style="display:none; font-size:1px; color:#f4f6fb; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">${subtitle}</span>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f6fb">
      <tr>
        <td align="center" style="padding: 30px 15px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:600px; background:#ffffff; border-radius:24px; overflow:hidden; box-shadow:0 24px 60px rgba(15,23,42,0.08);">
            <tr>
              <td style="background:#2563eb; padding:28px 30px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:0.2px;">Evisa</h1>
                <p style="margin:8px 0 0; color:#c7dafe; font-size:14px;">Automated notification from the system</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 30px 20px;">
                <h2 style="margin:0 0 12px; color:#0f172a; font-size:22px; line-height:1.3;">${title}</h2>
                <p style="margin:0 0 22px; color:#475569; font-size:15px; line-height:1.75;">${subtitle}</p>
                ${content}
              </td>
            </tr>
            ${cta}
            <tr>
              <td style="background:#f8fafc; padding:26px 30px; text-align:center; color:#64748b; font-size:13px; line-height:1.6;">
                <p style="margin:0;">&copy; ${new Date().getFullYear()} Evisa. All rights reserved.</p>
                <p style="margin:8px 0 0;">Customer support: <a href="tel:+842888852247" style="color:#2563eb; text-decoration:none;">(+84) 28 88 852 247</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  }

  async sendPaymentSuccessEmail(payment: Payment) {
    const title = 'Payment Successful';
    const subtitle = 'Thank you for using Evisa services.';
    const content = `
      <p style="margin:0 0 18px; color:#475569; font-size:15px; line-height:1.7;">Hello <strong>${payment.user.first_name}</strong>,</p>
      <p style="margin:0 0 22px; color:#475569; font-size:15px; line-height:1.7;">Your payment has been successfully processed. Here are the payment details:</p>
      <div style="border:1px solid #e2e8f0; border-radius:16px; padding:20px; background:#f8fafc;">
        ${this.createInfoBlock([
          { label: 'Visa ID', value: `${payment.visa.public_id}` },
          { label: 'Amount', value: `${payment.amount} VND` },
          { label: 'Transaction ID', value: `${payment.payment_id}` },
        ])}
      </div>
      <p style="margin:20px 0 0; color:#475569; font-size:14px; line-height:1.7;">We will send your eVisa details once your application is approved. For support, please contact our help center.</p>`;

    await this.sendEmail(
      payment.user.email,
      title,
      this.wrapTemplate(
        title,
        subtitle,
        content,
        'View My Profile',
        `${this.getClientUrl()}/profile`,
      ),
    );
  }

  async sendPaymentCanceledEmail(payment: Payment) {
    const title = 'Payment Canceled';
    const subtitle = 'Your payment was not completed.';
    const content = `
      <p style="margin:0 0 18px; color:#475569; font-size:15px; line-height:1.7;">Hello <strong>${payment.user.first_name}</strong>,</p>
      <p style="margin:0 0 22px; color:#475569; font-size:15px; line-height:1.7;">The payment for Visa ID <strong>${payment.visa.public_id}</strong> was canceled. If you want to try again, please go back to the checkout page.</p>`;

    await this.sendEmail(
      payment.user.email,
      title,
      this.wrapTemplate(
        title,
        subtitle,
        content,
        'Go to Homepage',
        this.getClientUrl(),
      ),
    );
  }

  async sendPaymentFailedEmail(payment: Payment) {
    const title = 'Payment Failed';
    const subtitle = 'We could not process your payment.';
    const content = `
      <p style="margin:0 0 18px; color:#475569; font-size:15px; line-height:1.7;">Hello <strong>${payment.user.first_name}</strong>,</p>
      <p style="margin:0 0 22px; color:#475569; font-size:15px; line-height:1.7;">The payment for Visa ID <strong>${payment.visa.public_id}</strong> failed. Please check your card details and try again.</p>`;

    await this.sendEmail(
      payment.user.email,
      title,
      this.wrapTemplate(
        title,
        subtitle,
        content,
        'Go to Homepage',
        this.getClientUrl(),
      ),
    );
  }

  async sendPaymentExpiredEmail(payment: Payment) {
    const title = 'Payment Session Expired';
    const subtitle = 'Your payment session has timed out.';
    const content = `
      <p style="margin:0 0 18px; color:#475569; font-size:15px; line-height:1.7;">Hello <strong>${payment.user.first_name}</strong>,</p>
      <p style="margin:0 0 22px; color:#475569; font-size:15px; line-height:1.7;">The payment session for Visa ID <strong>${payment.visa.public_id}</strong> has expired. Please try the payment process again.</p>`;

    await this.sendEmail(
      payment.user.email,
      title,
      this.wrapTemplate(
        title,
        subtitle,
        content,
        'Go to Homepage',
        this.getClientUrl(),
      ),
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
