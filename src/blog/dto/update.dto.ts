import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDTO } from '@visa/blog/dto/create.dto';

export class UpdateBlogDTO extends PartialType(CreateBlogDTO) {}
