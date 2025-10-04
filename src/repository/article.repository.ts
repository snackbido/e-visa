import { Injectable } from '@nestjs/common';
import { Article } from '@visa/articles/entity/article.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArticlesRepository extends Repository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }
}
