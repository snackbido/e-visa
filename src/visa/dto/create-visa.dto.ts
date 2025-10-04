import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { VISA_STATUS } from '@visa/visa/entity/visa.entity';

export class CreateVisaDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  country_code: string;

  @IsString()
  date_of_arrival: string;

  @IsOptional()
  arrival_border: string;

  @IsArray()
  applicant: {
    [key: string]: {
      passport_name: string;
      passport_number: string;
      gender: string;
      avatar: string;
      passport_image: string;
    };
  };

  @IsString()
  nationality: string;

  @IsString()
  number_of_visa: number;

  @IsString()
  type_of_visa: string;

  @IsString()
  time_of_visa: string;

  @IsString()
  purpose_of_visit: string;

  @IsString()
  processing_time: string;

  @IsString()
  user_id: string;

  @IsString()
  emergency_name: string;

  @IsString()
  emergency_relationship: string;

  @IsString()
  emergency_phone_number: string;

  @IsString()
  emergency_country_code: string;

  @IsOptional()
  status: VISA_STATUS;
}
