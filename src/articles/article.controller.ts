import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from '@visa/articles/article.service';
import { Article } from '@visa/articles/entity/article.entity';
import { CreateArticleDTO } from '@visa/articles/dto/create.dto';
import { UpdateArticleDTO } from '@visa/articles/dto/update.dto';

@Controller('/api/article/')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return await this.articleService.findAll();
  }

  @Get('/blog/:id')
  async findAllByBlogId(@Param('id') id: string): Promise<Article[]> {
    return await this.articleService.findAllWithBlogId(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return await this.articleService.findOneById(id);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDTO): Promise<string> {
    return await this.articleService.create(createArticleDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDTO,
  ): Promise<string> {
    return await this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.articleService.delete(id);
  }
}
