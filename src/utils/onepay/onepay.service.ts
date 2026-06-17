import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  generateStringToHash,
  genSecureHash,
  onePayVerifySecureHash,
  sortObj,
} from '@visa/helper/onepay.helper';
import * as querystring from 'querystring';
import * as crypto from 'crypto';

export type PaymentMethodType = 'INTERNATIONAL' | 'DOMESTIC' | 'QR' | 'BNPL';

type InitOnepayType = {
  paymentId: string;
  orderInfo: string;
  amount: number;
  customerId: string;
  customerIp: string;
  paymentMethod: PaymentMethodType;
  locale: string;
};

export interface InitPaymentResult {
  paymentUrl: string;
}
export type PaymentStatus = 'SUCCESS' | 'CANCELED' | 'EXPIRED' | 'ERROR';

export interface VerifyPaymentResult {
  status: PaymentStatus;
  data?: Record<string, string>;
}

@Injectable()
export class OnePayService {
  private accessCode: string;
  private merchant: string;
  private returnUrl: string;
  private hashKey: string;
  private user: string;
  private password: string;
  private hostName: string;

  constructor(private configService: ConfigService) {
    this.accessCode = configService.get<string>('ACCESS_CODE') ?? '';
    this.merchant = configService.get<string>('MERCHANT') ?? '';
    this.returnUrl = configService.get<string>('RETURN_URL_PROD') ?? '';
    this.hashKey = configService.get<string>('HASH_KEY') ?? '';
    this.user = configService.get<string>('ONEPAY_USER') ?? '';
    this.password = configService.get<string>('ONEPAY_PASSWORD') ?? '';
    this.hostName =
      configService.get<string>('ONEPAY_HOST_NAME') ?? 'mtf.onepay.vn';
  }
  buildDataForHash(params: Record<string, any>): string {
    const keys = Object.keys(params)
      .filter(
        (k) =>
          (k.startsWith('vpc_') || k.startsWith('user_')) &&
          k !== 'vpc_SecureHash',
      )
      .sort();

    return keys.map((k) => `${k}=${params[k]}`).join('&');
  }

  computeSecureHash(data: string, hexKey: string): string {
    const hmac = crypto.createHmac('sha256', Buffer.from(hexKey, 'hex'));
    hmac.update(data);

    return hmac.digest('hex').toUpperCase();
  }

  init({
    paymentId,
    orderInfo = 'Evisa Payment',
    amount,
    customerId,
    customerIp,
    paymentMethod,
    locale = 'vn',
  }: InitOnepayType): InitPaymentResult {
    const vpc_MerchTxnRef = paymentId; // unique when send request
    const vpc_OrderInfo = orderInfo; // description about order
    const vpc_Amount = String(amount + '00'); // amount of money (length = 12) add 00 before send request
    const vpc_TicketNo = customerIp; // customer's ip
    const vpc_CardList = paymentMethod; // type of payment (international, domestic or qr ...)
    const vpc_Customer_Id = customerId; // customer's id

    const requestData = {
      vpc_Version: '2',
      vpc_Currency: 'VND',
      vpc_Command: 'pay',
      vpc_AccessCode: this.accessCode,
      vpc_Merchant: this.merchant,
      vpc_Locale: locale,
      vpc_ReturnURL: `${this.returnUrl}`,
      vpc_MerchTxnRef: vpc_MerchTxnRef,
      vpc_OrderInfo: vpc_OrderInfo,
      vpc_Amount: vpc_Amount,
      vpc_TicketNo: vpc_TicketNo,
      vpc_CardList: vpc_CardList,
      AgainLink: this.configService.get<string>('CLIENT_URL') ?? '',
      Title: 'Evisa',
      vpc_Customer_Id: vpc_Customer_Id,
    };

    const sortedParam = sortObj(requestData);
    const stringToHash = generateStringToHash(sortedParam);
    const secureHash = genSecureHash(stringToHash, this.hashKey);
    const vpc_SecureHash = secureHash;
    requestData['vpc_SecureHash'] = vpc_SecureHash;

    const queryString = querystring.stringify(requestData);
    return {
      paymentUrl: `https://${this.hostName}/paygate/vpcpay.op?${queryString}`,
    };
  }

  async verify(merchTxnRef: string): Promise<VerifyPaymentResult> {
    try {
      const merchantParam: Record<string, string> = {
        vpc_Version: '2',
        vpc_Command: 'queryDR',
        vpc_AccessCode: this.accessCode,
        vpc_Merchant: this.merchant,
        vpc_Password: this.password,
        vpc_User: this.user,
        vpc_MerchTxnRef: merchTxnRef,
      };

      const sortedParam = sortObj(merchantParam);
      const stringToHash = generateStringToHash(sortedParam);
      merchantParam['vpc_SecureHash'] = genSecureHash(
        stringToHash,
        this.hashKey,
      );

      const urlRequest = `https://${this.hostName}/msp/api/v1/vpc/invoices/queries`;
      const bodyPayload = new URLSearchParams(merchantParam).toString();

      const response = await fetch(urlRequest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyPayload,
      });

      const bodyString = await response.text();

      const urlResponseCreated = `${urlRequest}?${bodyString}`;
      const isValidSecureHash = onePayVerifySecureHash(
        urlResponseCreated,
        this.hashKey,
      );

      const responseParams = new URLSearchParams(bodyString);

      const dataResponse = Object.fromEntries(responseParams.entries());

      const txnResponseCode = responseParams.get('vpc_TxnResponseCode');

      if (isValidSecureHash) {
        switch (txnResponseCode) {
          case '0':
            return { status: 'SUCCESS', data: dataResponse };
          case '99':
            return { status: 'CANCELED', data: dataResponse };
          case '253':
            return { status: 'EXPIRED', data: dataResponse };
          default:
            return { status: 'ERROR', data: dataResponse };
        }
      }

      return { status: 'ERROR', data: dataResponse };
    } catch (error) {
      console.error('Verify Payment Error:', error);
      return {
        status: 'ERROR',
        data: {
          message: error instanceof Error ? error.message : 'Unknown Error',
        },
      };
    }
  }
}
