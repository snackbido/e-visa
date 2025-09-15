import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ROLES } from '@visa/user/entity/user.entity';

export class updateDto {
  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  phone_number: string;

  @IsOptional()
  nationality: string;

  @IsOptional()
  @IsEnum(ROLES)
  role: string;
}
