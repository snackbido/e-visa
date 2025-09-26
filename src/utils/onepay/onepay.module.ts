import { Module } from '@nestjs/common';
import { OnePayService } from '@visa/utils/onepay/onepay.service';

@Module({ providers: [OnePayService] })
export class OnePayModule {}
