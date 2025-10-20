import { IsArray, IsString } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsArray()
  content: {
    [key: string]: {
      type: string;
      text: string;
    };
  };

  @IsString()
  blog_id: string;
}
