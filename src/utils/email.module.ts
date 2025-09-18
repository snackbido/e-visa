/* eslint-disable @typescript-eslint/require-await */
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          // service: 'gmail',
          // host: 'smtp.gmail.com',
          // port: 465,
          // secure: false, // Adjust based on your email service
          // auth: {
          //   user: 'hatran12387@gmail.com',
          //   pass: 'euxqtfyndxfdtmmx',
          // },
          host: 'sandbox.smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'a3bcdcfec65900',
            pass: 'eca599876f7825',
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
