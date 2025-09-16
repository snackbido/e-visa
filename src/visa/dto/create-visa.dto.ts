import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVisaDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone_number: string;

  @IsDateString()
  date_of_arrival: string;

  @IsOptional()
  arrival_border: string;

  @IsObject()
  applicant: {
    [key: string]: {
      passport_name: string;
      passport_number: string;
      gender: string;
    };
  };

  @IsString()
  nationality: string;

  @IsNumber()
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
}
