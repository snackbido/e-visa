import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { VisaController } from '@visa/visa/visa.controller';
import { VisaService } from '@visa/visa/visa.service';
import { EmailService } from '@visa/utils/email.service';
import { VisaRepository } from '@visa/repository/visa.repository';

@Module({
  imports: [DatabaseConfigModule],
  controllers: [VisaController],
  providers: [VisaService, EmailService, VisaRepository],
})
export class VisaModule {}
