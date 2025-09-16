import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Payment, STATUS } from '@visa/payment/entity/payment.entity';

export class PaymentDto {
  @IsNumber()
  amount: number;

  @IsString()
  user_id: string;

  @IsEnum(Payment)
  status: STATUS;
}
