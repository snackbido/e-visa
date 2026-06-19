import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './mail.procesor';
import { PaymentListener } from './mail.listener';
import { VisaModule } from '@visa/visa/visa.module';
import { EmailModule } from '@visa/utils/email/email.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
    VisaModule,
    EmailModule,
  ],
  providers: [
    PaymentListener,
    MailProcessor,
    // MailService
  ],
})
export class NotificationModule {}
