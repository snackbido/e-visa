import { Injectable } from '@nestjs/common';
import { Payment } from '@visa/payment/entity/payment.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentRepository extends Repository<Payment> {
  constructor(private dataSource: DataSource) {
    super(Payment, dataSource.createEntityManager());
  }
}
