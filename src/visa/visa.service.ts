/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisaRepository } from '@visa/repository/visa.repository';
import { Visa } from '@visa/visa/entity/visa.entity';
import { CreateVisaDto } from '@visa/visa/dto/create-visa.dto';
import { UpdateVisaDto } from '@visa/visa/dto/update-visa.dto';
import { CloudinaryService } from '@visa/utils/cloudinary/cloudinary.service';

@Injectable()
export class VisaService {
  constructor(
    @InjectRepository(VisaRepository) private visaRepository: VisaRepository,
    private cloudinaryService: CloudinaryService,
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

  async create(
    visaDto: CreateVisaDto,
    file: Array<Express.Multer.File>,
  ): Promise<Visa> {
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

    if (Array.isArray(visaDto.applicant)) {
      for (let index = 0; index < visaDto.applicant.length; index++) {
        const applicantDto = visaDto.applicant[index];

        const avatarFieldName = `applicant[${index}][avatar]`;
        const passportFieldName = `applicant[${index}][passport_image]`;

        const avatarFile = file.find((f) => f.fieldname === avatarFieldName);
        if (avatarFile) {
          const result = await this.cloudinaryService.uploadImage(
            avatarFile,
            'visa',
          );
          applicantDto.avatar = result.secure_url;
        }

        const passportFile = file.find(
          (f) => f.fieldname === passportFieldName,
        );
        if (passportFile) {
          const result = await this.cloudinaryService.uploadImage(
            passportFile,
            'visa',
          );
          applicantDto.passport_image = result.secure_url;
        }
      }
    }
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
