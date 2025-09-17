import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
