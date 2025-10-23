import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Blog } from '@visa/blog/entity/blog.entity';
import { BlogService } from '@visa/blog/blog.service';
import { CreateBlogDTO } from '@visa/blog/dto/create.dto';
import { UpdateBlogDTO } from '@visa/blog/dto/update.dto';

@Controller('/api/blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async findAll(): Promise<Blog[]> {
    return await this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
    return await this.blogService.findOneById(id);
  }

  @Get('slug/:slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<Blog> {
    return await this.blogService.findOneBySlug(slug);
  }

  @Post()
  async create(@Body() createBlogDto: CreateBlogDTO): Promise<string> {
    return await this.blogService.create(createBlogDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDTO,
  ): Promise<string> {
    return await this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.blogService.delete(id);
  }
}
