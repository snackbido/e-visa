/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './mail.procesor';
import { PaymentListener } from './mail.listener';
import { EmailService } from '@visa/utils/email/email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
  ],
  providers: [
    PaymentListener,
    MailProcessor,
    EmailService,
    // MailService
  ],
})
export class NotificationModule {}
