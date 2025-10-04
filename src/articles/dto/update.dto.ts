import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDTO } from '@visa/articles/dto/create.dto';

export class UpdateArticleDTO extends PartialType(CreateArticleDTO) {}
