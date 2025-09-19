import { IsString } from 'class-validator';
import { VISA_STATUS } from '../entity/visa.entity';

export class UpdateVisaDto {
  @IsString()
  status: VISA_STATUS;
}
