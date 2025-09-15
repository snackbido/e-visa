import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisaRepository } from '@visa/repository/visa.repository';
import { Visa } from '@visa/visa/entity/visa.entity';

@Injectable()
export class VisaService {
  constructor(
    @InjectRepository(VisaRepository) private visaRepository: VisaRepository,
  ) {}

  async getAllVisa(): Promise<Visa[]> {
    return await this.visaRepository.find();
  }

  async getVisa(id: string): Promise<Visa> {
    const visa = await this.visaRepository.findOneBy({ id });

    if (!visa) throw new NotFoundException('Visa not found');

    return visa;
  }
}
