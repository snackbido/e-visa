import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class OnePayService {
  constructor() {}
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
}
