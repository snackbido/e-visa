import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogRepository } from '@visa/repository/blog.repository';
import { Blog } from '@visa/blog/entity/blog.entity';
import { CreateBlogDTO } from '@visa/blog/dto/create.dto';
import { UpdateBlogDTO } from '@visa/blog/dto/update.dto';
import slugify from 'slugify';
@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository) private blogRepository: BlogRepository,
  ) {}

  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async findOneBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { slug },
      relations: ['articles'],
    });
    if (!blog) throw new NotFoundException();
    return blog;
  }

  async findOneById(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['articles'],
    });
    if (!blog) throw new NotFoundException('Blog not found');

    return blog;
  }

  async create(createBlogDto: CreateBlogDTO): Promise<string> {
    const { ...data } = createBlogDto;
    const blog = this.blogRepository.create({
      ...data,
      slug: slugify(data.title, { lower: true }),
    });

    await this.blogRepository.save(blog);

    return 'Blog was created';
  }

  async update(id: string, updateBlogDto: UpdateBlogDTO): Promise<string> {
    const blog = await this.findOneById(id);

    await this.blogRepository.update({ id: blog.id }, updateBlogDto);

    return 'Blog was updated';
  }

  async delete(id: string): Promise<string> {
    const blog = await this.findOneById(id);

    await this.blogRepository.delete({ id: blog.id });
    return 'Blog was deleted';
  }
}
