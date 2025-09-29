import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisaRepository } from '@visa/repository/visa.repository';
import { Visa } from '@visa/visa/entity/visa.entity';
import { CreateVisaDto } from '@visa/visa/dto/create-visa.dto';
import { EmailService } from '@visa/utils/email/email.service';
import { UpdateVisaDto } from './dto/update-visa.dto';

@Injectable()
export class VisaService {
  constructor(
    @InjectRepository(VisaRepository) private visaRepository: VisaRepository,
    private emailService: EmailService,
  ) {}

  async getAllVisa(): Promise<Visa[]> {
    return await this.visaRepository.find();
  }

  async getHistoryVisa(user_id: string): Promise<Visa[]> {
    const visas = await this.visaRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
    });
    return visas;
  }

  async getVisa(id: string): Promise<Visa> {
    const visa = await this.visaRepository.findOneBy({ id });

    if (!visa) throw new NotFoundException('Visa not found');

    return visa;
  }

  async create(visaDto: CreateVisaDto): Promise<Visa> {
    const {
      applicant,
      arrival_border,
      date_of_arrival,
      email,
      first_name,
      last_name,
      nationality,
      number_of_visa,
      phone_number,
      processing_time,
      purpose_of_visit,
      time_of_visa,
      type_of_visa,
      user_id,
      status,
    } = visaDto;
    const visa = this.visaRepository.create({
      applicant,
      arrival_border,
      date_of_arrival,
      email,
      first_name,
      last_name,
      nationality,
      number_of_visa,
      phone_number,
      processing_time,
      purpose_of_visit,
      time_of_visa,
      type_of_visa,
      user_id,
      status,
    });

    await this.visaRepository.save(visa);

    return visa;
  }

  async update(id: string, visaDto: UpdateVisaDto): Promise<string> {
    const visa = await this.visaRepository.findOneBy({ id });
    if (!visa) throw new NotFoundException('Cannot find visa');

    await this.visaRepository.update(
      {
        id: visa.id,
      },
      { status: visaDto.status },
    );

    return 'Updated visa';
  }

  async delete(id: string): Promise<string> {
    const visa = await this.visaRepository.findOneBy({ id });
    if (!visa) throw new NotFoundException('Cannot find visa');
    await this.visaRepository.delete({ id: visa.id });
    return 'Deleted visa';
  }
}
