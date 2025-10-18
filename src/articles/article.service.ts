import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesRepository } from '@visa/repository/article.repository';
import { Article } from '@visa/articles/entity/article.entity';
import { CreateArticleDTO } from '@visa/articles/dto/create.dto';
import { UpdateArticleDTO } from '@visa/articles/dto/update.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticlesRepository)
    private articleRepository: ArticlesRepository,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async findAllWithBlogId(id: string): Promise<Article[]> {
    return await this.articleRepository.find({ where: { blog_id: id } });
  }

  async findOneById(id: string): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });

    if (!article) throw new NotFoundException('Article not found');

    return article;
  }

  async create(createArticleDto: CreateArticleDTO): Promise<string> {
    const { ...articleData } = createArticleDto;
    const article = this.articleRepository.create({
      ...articleData,
    });

    await this.articleRepository.save(article);

    return 'Article was created';
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDTO,
  ): Promise<string> {
    const { blog_id, ...articleData } = updateArticleDto;
    const article = await this.findOneById(id);

    await this.articleRepository.update(
      { id: article.id },
      { ...articleData, blog: { id: blog_id } },
    );

    return 'Article was updated';
  }

  async delete(id: string): Promise<string> {
    const article = await this.findOneById(id);

    await this.articleRepository.delete({ id: article.id });
    return 'Article was deleted';
  }
}
