import { Injectable } from '@nestjs/common';
import { Visa } from '@visa/visa/entity/visa.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VisaRepository extends Repository<Visa> {
  constructor(private dataSource: DataSource) {
    super(Visa, dataSource.createEntityManager());
  }
}
