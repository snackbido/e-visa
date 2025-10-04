import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { ArticleService } from '@visa/articles/article.service';
import { ArticlesRepository } from '@visa/repository/article.repository';
import { ArticleController } from '@visa/articles/article.controller';

@Module({
  imports: [DatabaseConfigModule],
  providers: [ArticleService, ArticlesRepository],
  controllers: [ArticleController],
})
export class ArticleModule {}
