import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from '@visa/repository/payment.repository';
import { PaymentDto } from '@visa/payment/dto/payment.dto';
import { Payment } from '@visa/payment/entity/payment.entity';
import { EmailService } from '@visa/utils/email/email.service';
import { UserRepository } from '@visa/repository/user.repository';
import {
  InitPaymentResult,
  OnePayService,
} from '@visa/utils/onepay/onepay.service';
@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
    private emailService: EmailService,
    private onePayService: OnePayService,
    private userRepository: UserRepository,
  ) {}

  initializePayment(paymentDto: PaymentDto): InitPaymentResult {
    const date = Date.now();
    const payment_id = `payment_${date}`;
    const { amount, user_id, visa_id, payment_gate, payment_method } =
      paymentDto;

    if (!payment_method) {
      throw new BadRequestException('Payment method is required');
    }

    const payment = this.paymentRepository.create({
      amount,
      user_id: user_id,
      visa_id: visa_id,
      payment_gate: payment_gate,
      payment_method: payment_method,
      payment_id: payment_id,
    });

    let initPaymentResult: InitPaymentResult | undefined;

    switch (payment_gate) {
      case 'ONEPAY':
        initPaymentResult = this.onePayService.init({
          paymentId: payment_id,
          orderInfo: payment.id,
          amount: payment.amount,
          customerId: String(payment.user_id),
          // TODO: get customer ip
          customerIp: '192.168.1.9',
          paymentMethod: payment_method,
          locale: 'en',
        });
        break;
      default:
        break;
    }

    if (!initPaymentResult) {
      throw new BadRequestException('Unsupported payment gate');
    }

    return initPaymentResult;
  }

  async createPayment(paymentDto: PaymentDto): Promise<string> {
    const {
      amount,
      user_id,
      visa_id,
      status,
      transaction_no,
      txnResponseCode,
      message,
      public_id,
    } = paymentDto;

    const payment = this.paymentRepository.create({
      amount,
      user_id,
      visa_id,
      status,
    });

    let prefix: string = '',
      start: string = '',
      end: string = '';
    //shorthand transaction_no
    if (transaction_no) {
      const parts = transaction_no.split('-');
      prefix = parts.length > 1 ? parts[0] + '-' : '';
      const code = parts.length > 1 ? parts.slice(1).join('-') : transaction_no;
      start = code.substring(0, 4);
      end = code.substring(code.length - 4);
    }

    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) throw new BadRequestException('User not found');
    const newPayment = await this.paymentRepository.save(payment);
    if (txnResponseCode == '0') {
      const html = `<div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #e5e7eb;">
    <div style="background-color: #2563eb; color: #ffffff; padding: 32px 24px; text-align: center; border-top-left-radius: 12px; border-top-right-radius: 12px;">
        <h1 style="font-size: 28px; font-weight: 700; margin: 0;">Payment Successful!</h1>
    </div>
    <div style="padding: 32px 24px; color: #4b5563;">
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hello, ${user.first_name}</p>
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Your e-visa payment transaction has been processed successfully. Thank you for trusting and using our service.</p>
        
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 16px;">E-Visa Detail</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">ID Visa</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">${public_id}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Transaction ID</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">${transaction_no ? `${prefix}${start}...${end}` : 'No information'}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Full Name</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">${user.first_name + ' ' + user.last_name}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Card Number</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">${paymentDto.card_number ? paymentDto.card_number : 'No information'}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Date of Paid</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">${newPayment.created_at.toLocaleString()}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: none; color: #6b7280;">Amount Paid</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: none; font-weight: 500; color: #111827; text-align: right;">${amount} VND</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
        Your e-visa information will be sent to this email once your application has been processed. After your visa application is accepted, the details of your visa will be sent to you through this email. If you have any questions regarding this process, please contact our support team via <a href="+842888852247">${'(+84)28 88 852 247'}</a>.</p>
    </div>
    <div style="background-color: #e5e7eb; color: #6b7280; text-align: center; padding: 24px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
        <p style="font-size: 12px; margin: 0;">This email was sent automatically, please do not reply.</p>
        <p style="font-size: 12px; margin: 0;">Copyright &copy; ${new Date().getFullYear()} Book247 | 1st Floor, Vietphone Building, 64 Nguyen Dinh Chieu, Ward Da Kao, District 1, HCMC</p>
    </div>
</div>`;
      await this.emailService.sendEmail(
        user.email,
        'Your payment was successfully',
        html,
      );
    } else {
      const html = `<div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #e5e7eb; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="background-color: #dc2626; color: #ffffff; padding: 32px 24px; text-align: center; border-top-left-radius: 12px; border-top-right-radius: 12px;">
        <h1 style="font-size: 28px; font-weight: 700; margin: 0;">Payment Failed</h1>
    </div>
    <div style="padding: 32px 24px; color: #4b5563;">
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hello, ${user.first_name},</p>
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Unfortunately, your e-visa payment transaction was <strong style="color: #dc2626;">unsuccessful</strong>. Please check your information and try again.</p>
        
        <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <h2 style="font-size: 20px; font-weight: 600; color: #991b1b; margin: 0 0 16px;">Transaction Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; color: #6b7280;">Visa ID</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; font-weight: 500; color: #111827; text-align: right;">${public_id}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; color: #6b7280;">Transaction ID</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; font-weight: 500; color: #111827; text-align: right;">${transaction_no ? `${prefix}${start}...${end}` : 'No information'}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; color: #6b7280;">Full Name</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; font-weight: 500; color: #111827; text-align: right;">${user.first_name + ' ' + user.last_name}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; color: #6b7280;">Card Number</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; font-weight: 500; color: #111827; text-align: right;">${paymentDto.card_number ? paymentDto.card_number : 'No information'}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; color: #6b7280;">Date & Time</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; font-weight: 500; color: #111827; text-align: right;">${new Date().toISOString()}</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; color: #6b7280;">Amount</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #fecaca; font-weight: 500; color: #111827; text-align: right;">${amount} VND</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: none; color: #6b7280;">Reason</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: none; font-weight: 500; color: #dc2626; text-align: right;">${message || 'Invalid card information'}</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
        If you need assistance or have any questions, please contact our support team at <a href="tel:+842888852247" style="color: #2563eb; text-decoration: none; font-weight: 500;">(+84)28 88 852 247</a>.</p>
    </div>
    <div style="background-color: #e5e7eb; color: #6b7280; text-align: center; padding: 24px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
        <p style="font-size: 12px; margin: 0;">This email was sent automatically, please do not reply.</p>
        <p style="font-size: 12px; margin: 0;">Copyright &copy; ${new Date().getFullYear()} Book247 | 1st Floor, Vietphone Building, 64 Nguyen Dinh Chieu, Ward Da Kao, District 1, HCMC</p>
    </div>
</div>`;
      await this.emailService.sendEmail(
        user.email,
        'Your payment was failed',
        html,
      );
    }

    return 'Payment created';
  }

  async getPayments(): Promise<Payment[]> {
    return await this.paymentRepository.find({ order: { created_at: 'DESC' } });
  }
}
