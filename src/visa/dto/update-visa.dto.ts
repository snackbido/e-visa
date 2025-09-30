import { IsString } from 'class-validator';
import { VISA_STATUS } from '@visa/visa/entity/visa.entity';

export class UpdateVisaDto {
  @IsString()
  status: VISA_STATUS;
}
