import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { PaymentService } from '@visa/payment/payment.service';
import { PaymentRepository } from '@visa/repository/payment.repository';
import { PaymentController } from '@visa/payment/payment.controller';

@Module({
  imports: [DatabaseConfigModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
