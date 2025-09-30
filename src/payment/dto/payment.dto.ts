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

  @IsOptional()
  card_number?: string;

  @IsOptional()
  transaction_no: string;
}
