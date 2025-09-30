import { Module } from '@nestjs/common';
import { AppController } from '@visa/app.controller';
import { AppService } from '@visa/app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { UserModule } from '@visa/user/user.module';
import { AuthModule } from '@visa/auth/auth.module';
import { EmailModule } from '@visa/utils/email/email.module';
import { VisaModule } from '@visa/visa/visa.module';
import { PaymentModule } from '@visa/payment/payment.module';
import { RedisCachedModule } from '@visa/utils/cached/redis.module';
import { CloudinaryModule } from '@visa/utils/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseConfigModule,
    UserModule,
    EmailModule,
    AuthModule,
    VisaModule,
    PaymentModule,
    CloudinaryModule,
    RedisCachedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
