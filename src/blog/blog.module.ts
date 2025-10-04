import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from '@visa/repository/blog.repository';
import { DatabaseConfigModule } from '@visa/config/db/database.module';

@Module({
  imports: [DatabaseConfigModule],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogModule {}
