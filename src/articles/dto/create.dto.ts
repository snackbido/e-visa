import { Optional } from '@nestjs/common';
import { IsArray, IsString } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsArray()
  content: {
    type: string;
    text?: string;
    url?: string;
    caption?: string;
  };

  @IsString()
  blog_id: string;

  @IsString()
  description: string;

  @Optional()
  image_url: string;
}
