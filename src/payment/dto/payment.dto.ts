import { IsNumber, IsOptional, IsString } from 'class-validator';
import { STATUS } from '@visa/payment/entity/payment.entity';

export class PaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  user_id: string;

  @IsString()
  visa_id: string;

  @IsOptional()
  status: STATUS;

  @IsString()
  payment_gate?: string;

  @IsString()
  payment_method?: 'INTERNATIONAL' | 'DOMESTIC' | 'QR' | 'BNPL';

  @IsOptional()
  card_number?: string;

  @IsString()
  transaction_no: string;

  @IsOptional()
  txnResponseCode?: string;

  @IsOptional()
  message?: string;

  @IsString()
  public_id: string;

  @IsOptional()
  customer_ip?: string;
}
