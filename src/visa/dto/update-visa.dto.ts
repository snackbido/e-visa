import { PartialType } from '@nestjs/mapped-types';
import { CreateVisaDto } from './create-visa.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateVisaDto extends PartialType(CreateVisaDto) {
  @IsOptional()
  @IsString()
  is_active: string;
}
