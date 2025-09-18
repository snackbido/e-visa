import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { VisaController } from '@visa/visa/visa.controller';
import { VisaService } from '@visa/visa/visa.service';
import { EmailService } from '@visa/utils/email.service';
import { VisaRepository } from '@visa/repository/visa.repository';
import { AuthModule } from '@visa/auth/auth.module';
import { RedisService } from '@visa/utils/cached/redis.service';
import { RedisCachedModule } from '@visa/utils/cached/redis.module';

@Module({
  imports: [DatabaseConfigModule, AuthModule, RedisCachedModule],
  controllers: [VisaController],
  providers: [VisaService, EmailService, VisaRepository, RedisService],
})
export class VisaModule {}
