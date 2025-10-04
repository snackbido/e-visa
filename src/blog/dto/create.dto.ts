import { IsOptional, IsString } from 'class-validator';

export class CreateBlogDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  cover_image: string;
}
