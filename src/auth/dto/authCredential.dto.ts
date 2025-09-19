import { ROLES } from '@visa/user/entity/user.entity';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthCredential {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: `Password too weak`,
  })
  password: string;

  @IsString()
  @IsOptional()
  phone_number: string;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsString()
  @IsEnum(ROLES)
  @IsOptional()
  role: string;
}
