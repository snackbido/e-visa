import { Module } from '@nestjs/common';
import { UserService } from '@visa/user/user.service';
import { UserController } from '@visa/user/user.controller';
import { AuthModule } from '@visa/auth/auth.module';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { UserRepository } from '@visa/repository/user.repository';
import { RedisService } from '@visa/utils/cached/redis.service';
import { RedisCachedModule } from '@visa/utils/cached/redis.module';

@Module({
  imports: [DatabaseConfigModule, AuthModule, RedisCachedModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, RedisService],
})
export class UserModule {}
