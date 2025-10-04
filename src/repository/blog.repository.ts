import { Injectable } from '@nestjs/common';
import { Blog } from '@visa/blog/entity/blog.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BlogRepository extends Repository<Blog> {
  constructor(private readonly dataSource: DataSource) {
    super(Blog, dataSource.createEntityManager());
  }
}
