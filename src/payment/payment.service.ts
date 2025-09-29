/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from '@visa/repository/payment.repository';
import { PaymentDto } from '@visa/payment/dto/payment.dto';
import { Payment } from '@visa/payment/entity/payment.entity';
import { ConfigService } from '@nestjs/config';
import { OnePayService } from '@visa/utils/onepay/onepay.service';
import * as querystring from 'querystring';
import { EmailService } from '@visa/utils/email/email.service';
import { UserRepository } from '@visa/repository/user.repository';
@Injectable()
export class PaymentService {
  private accessCode: string | undefined;
  private merchant: string | undefined;
  private returnUrl: string | undefined;
  private hashKey: string | undefined;

  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
    private configService: ConfigService,
    private onePayService: OnePayService,
    private emailService: EmailService,
    private userRepository: UserRepository,
  ) {
    this.accessCode = configService.get<string>('ACCESS_CODE');
    this.merchant = configService.get<string>('MERCHANT');
    this.returnUrl = configService.get<string>('RETURN_URL');
    this.hashKey = configService.get<string>('HASH_KEY');
  }

  buildPaymentUrl({
    amount,
    orderInfo,
    clientIp,
  }: {
    amount: number;
    orderInfo: string;
    clientIp: string;
  }) {
    // amount: in VND (e.g. 25000), must multiply by 100 per OnePAY
    const amountForOnepay = String(Math.round(amount) * 100); // e.g. 25000 -> 2500000
    const params: Record<string, string> = {
      vpc_Version: '2',
      vpc_Command: 'pay',
      vpc_AccessCode: this.accessCode as string,
      vpc_Merchant: this.merchant as string,
      vpc_Locale: 'en',
      vpc_ReturnURL: this.returnUrl as string,
      vpc_MerchTxnRef: 'TXN_' + Date.now(),
      vpc_OrderInfo: orderInfo,
      vpc_Amount: amountForOnepay,
      vpc_TicketNo: clientIp || '127.0.0.1',
      vpc_Currency: 'VND',
      // you can add vpc_CardList or user_xxx here if needed
    };

    const data = this.onePayService.buildDataForHash(params);
    const secureHash = this.onePayService.computeSecureHash(
      data,
      this.hashKey as string,
    );
    params['vpc_SecureHash'] = secureHash;

    const url =
      'https://mtf.onepay.vn/paygate/vpcpay.op?' +
      querystring.stringify(params);
    return { url, params };
  }

  verifyParams(params: Record<string, any>) {
    const data = this.onePayService.buildDataForHash(params);
    const expected = this.onePayService.computeSecureHash(
      data,
      this.hashKey as string,
    );
    const got = (params['vpc_SecureHash'] || '').toUpperCase();
    return { ok: expected === got, expected, got };
  }

  /** Xử lý Return URL (chỉ hiển thị, không update DB) */
  handleReturn(params: Record<string, any>) {
    const verify = this.verifyParams(params);
    if (!verify.ok) throw new BadRequestException('Invalid signature');

    if (params['vpc_TxnResponseCode'] !== '0')
      throw new BadRequestException('Payment failed');

    return 'Payment success';
  }

  /** Xử lý IPN (update DB) */
  handleIpn(params: Record<string, any>) {
    const verify = this.verifyParams(params);
    if (!verify.ok) throw new BadRequestException('Invalid signature');
    console.log(params);

    if (params['vpc_TxnResponseCode'] !== '0') {
      throw new BadRequestException('Payment failed');
    }

    return 'responsecode=1&desc=confirm-success';
  }

  async createPayment(paymentDto: PaymentDto): Promise<string> {
    const { amount, user_id, visa_id, status } = paymentDto;

    const payment = this.paymentRepository.create({
      amount,
      user_id,
      visa_id,
      status,
    });
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) throw new BadRequestException('User not found');
    const newPayment = await this.paymentRepository.save(payment);

    const html = `<div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #e5e7eb;">
    <div style="background-color: #2563eb; color: #ffffff; padding: 32px 24px; text-align: center; border-top-left-radius: 12px; border-top-right-radius: 12px;">
        <h1 style="font-size: 28px; font-weight: 700; margin: 0;">Thanh Toán Thành Công!</h1>
    </div>
    <div style="padding: 32px 24px; color: #4b5563;">
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hello, **${user.first_name}**,</p>
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Your e-visa payment transaction has been processed successfully. Thank you for trusting and using our service.</p>
        
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 16px;">E-Visa Detail</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">ID Visa</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">**${visa_id}**</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Transaction ID</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">**${newPayment.id}**</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Full Name</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">**${user.first_name + ' ' + user.last_name}**</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Card Number</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">**${paymentDto.card_number}**</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Date of Paid</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: 500; color: #111827; text-align: right;">**${newPayment.created_at.toISOString()}**</td>
                </tr>
                <tr>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: none; color: #6b7280;">Amount Paid</td>
                    <td style="font-size: 14px; padding: 8px 0; border-bottom: none; font-weight: 500; color: #111827; text-align: right;">**${amount} VND**</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Your e-visa information will be sent to this email as soon as your application is processed. If you have any questions about this transaction, please contact our support team via ${'+84 93248750'}.</p>
        
    </div>
    <div style="background-color: #e5e7eb; color: #6b7280; text-align: center; padding: 24px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
        <p style="font-size: 12px; margin: 0;">This email was sent automatically, please do not reply.</p>
        <p style="font-size: 12px; margin: 0;">Copyright &copy; **[${new Date().getFullYear()}]** **[Book247]** | **[1st Floor, Vietphone Building, 64 Nguyen Dinh Chieu, Ward Da Kao, District 1, HCMC]**</p>
    </div>
</div>`;
    await this.emailService.sendEmail(user.email, 'Payment Successful', html);
    return 'Payment created';
  }

  async getPayments(): Promise<Payment[]> {
    return await this.paymentRepository.find({ order: { created_at: 'DESC' } });
  }
}
