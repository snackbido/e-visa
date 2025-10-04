import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '@visa/articles/entity/article.entity';
import { Blog } from '@visa/blog/entity/blog.entity';
import { Payment } from '@visa/payment/entity/payment.entity';
import { User } from '@visa/user/entity/user.entity';
import { Visa } from '@visa/visa/entity/visa.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Visa, User, Payment, Blog, Article],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseConfigModule {}
