/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisaRepository } from '@visa/repository/visa.repository';
import { Visa, VISA_STATUS } from '@visa/visa/entity/visa.entity';
import { CreateVisaDto } from '@visa/visa/dto/create-visa.dto';
import { UpdateVisaDto } from '@visa/visa/dto/update-visa.dto';
import { CloudinaryService } from '@visa/utils/cloudinary/cloudinary.service';
import crypto from 'crypto';
import { In } from 'typeorm';

@Injectable()
export class VisaService {
  constructor(
    @InjectRepository(VisaRepository) private visaRepository: VisaRepository,
    private cloudinaryService: CloudinaryService,
  ) {}

  private calculateExpiryDate(timeOfVisa: string, approvedDate: Date): Date {
    const startDate = new Date(approvedDate);
    if (isNaN(startDate.getTime())) {
      return new Date(0);
    }

    let daysToAdd = 0;

    if (timeOfVisa && timeOfVisa.includes('1 month')) {
      daysToAdd = 29;
    } else {
      daysToAdd = 89;
    }

    const expiryDate = new Date(startDate);
    expiryDate.setDate(startDate.getDate() + daysToAdd);

    expiryDate.setHours(23, 59, 59, 999);

    return expiryDate;
  }

  async getAllVisa(): Promise<Visa[]> {
    return await this.visaRepository.find({ where: { is_active: '1' } });
  }

  async getHistoryVisa(user_id: string): Promise<Visa[]> {
    const visas = await this.visaRepository.find({
      where: { user_id, is_active: '1' },
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
      country_code,
      processing_time,
      purpose_of_visit,
      time_of_visa,
      type_of_visa,
      user_id,
      status,
      emergency_name,
      emergency_phone_number,
      emergency_relationship,
      emergency_country_code,
    } = visaDto;

    const emergency_contact = {
      full_name: emergency_name,
      relationship: emergency_relationship,
      phone_number: emergency_phone_number,
      country_code: emergency_country_code,
    };

    const public_id = crypto
      .randomBytes(8)
      .toString('hex')
      .substring(0, 20)
      .toUpperCase();

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
      country_code,
      processing_time,
      purpose_of_visit,
      time_of_visa,
      type_of_visa,
      user_id,
      status,
      public_id,
      emergency_contact,
    });
    await this.visaRepository.save(visa);

    return visa;
  }

  async update(
    id: string,
    visaDto: UpdateVisaDto,
    files: Array<Express.Multer.File>,
  ): Promise<string> {
    if (Array.isArray(visaDto.applicant)) {
      for (let index = 0; index < visaDto.applicant.length; index++) {
        const applicantDto = visaDto.applicant[index];

        const avatarFieldName = `applicant[${index}][avatar]`;
        const passportFieldName = `applicant[${index}][passport_image]`;

        const avatarFile = files.find((f) => f.fieldname === avatarFieldName);
        if (avatarFile) {
          const result = await this.cloudinaryService.uploadImage(
            avatarFile,
            'visa',
          );
          applicantDto.avatar = result.secure_url;
        }

        const passportFile = files.find(
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

    const visa = await this.visaRepository.findOneBy({ id });
    if (!visa) throw new NotFoundException('Cannot find visa');

    const existingEmergency = visa.emergency_contact || {};

    const updatedEmergencyContact = {
      ...existingEmergency, // Giữ lại dữ liệu cũ
      ...(visaDto.emergency_name && { full_name: visaDto.emergency_name }),
      ...(visaDto.emergency_phone_number && {
        phone_number: visaDto.emergency_phone_number,
      }),
      ...(visaDto.emergency_relationship && {
        relationship: visaDto.emergency_relationship,
      }),
      ...(visaDto.emergency_country_code && {
        country_code: visaDto.emergency_country_code,
      }),
    };
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
      country_code,
      processing_time,
      purpose_of_visit,
      time_of_visa,
      type_of_visa,
    } = visaDto;

    await this.visaRepository.update(
      {
        id: visa.id,
      },
      {
        applicant: applicant,
        arrival_border,
        country_code,
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
        emergency_contact: updatedEmergencyContact,
        status: visaDto.status,
        is_active: visaDto.is_active,
      },
    );

    return 'Updated visa';
  }

  async delete(id: string): Promise<string> {
    const visa = await this.visaRepository.findOneBy({ id });
    if (!visa) throw new NotFoundException('Cannot find visa');
    await this.visaRepository.delete({ id: visa.id });
    return 'Deleted visa';
  }

  async checkAndExpireVisas(): Promise<string> {
    const approvedVisas = await this.visaRepository.find({
      where: {
        status: VISA_STATUS.APPROVE,
      },
    });

    const now = new Date();
    const expiredVisaIds: string[] = [];

    for (const visa of approvedVisas) {
      if (!visa.time_of_visa || !visa.updated_at) {
        continue;
      }

      const expiryDate = this.calculateExpiryDate(
        visa.time_of_visa,
        visa.updated_at,
      );

      if (now.getTime() > expiryDate.getTime()) {
        expiredVisaIds.push(visa.id);
      }
    }

    if (expiredVisaIds.length > 0) {
      await this.visaRepository.update(
        { id: In(expiredVisaIds) },
        { status: VISA_STATUS.EXPIRES },
      );
      return `Successfully updated ${expiredVisaIds.length} visas to Expires.`;
    }

    return 'No visas needed to be expired.';
  }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Chạy lúc 00:00 mỗi ngày
  // async handleCron() {
  //   // console.log('Running expiry check...');
  //   await this.checkAndExpireVisas();
  // }
}
