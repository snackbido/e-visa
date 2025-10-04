import { IsString } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  blog_id: string;
}
