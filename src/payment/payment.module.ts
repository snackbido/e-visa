import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { PaymentService } from '@visa/payment/payment.service';
import { PaymentRepository } from '@visa/repository/payment.repository';
import { PaymentController } from '@visa/payment/payment.controller';
import { OnePayService } from '@visa/utils/onepay/onepay.service';
import { OnePayModule } from '@visa/utils/onepay/onepay.module';
import { UserRepository } from '@visa/repository/user.repository';
import { EmailService } from '@visa/utils/email/email.service';
import { RedisCachedModule } from '@visa/utils/cached/redis.module';
import { RedisService } from '@visa/utils/cached/redis.service';

@Module({
  imports: [DatabaseConfigModule, OnePayModule, RedisCachedModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentRepository,
    OnePayService,
    UserRepository,
    EmailService,
    RedisService,
  ],
})
export class PaymentModule {}
