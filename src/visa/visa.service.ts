import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisaRepository } from '@visa/repository/visa.repository';
import { Visa } from '@visa/visa/entity/visa.entity';
import { CreateVisaDto } from '@visa/visa/dto/create-visa.dto';
import { EmailService } from '@visa/utils/email.service';
import { User } from '@visa/user/entity/user.entity';
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

  async create(visaDto: CreateVisaDto, user: User): Promise<Visa> {
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
    });

    const html = `<div class="bg-gray-100 font-sans leading-relaxed">
    <div class="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-5">
        <div class="bg-[#1a428a] text-white p-8 text-center">
            <h1 class="text-3xl font-bold m-0">[Embassy/Consulate/Agency Name]</h1>
        </div>
        <div class="p-8 text-gray-800">
            <h2 class="text-2xl text-[#1a428a] mt-0">Your Visa Application Status</h2>
            <p>Dear <strong class="font-bold">[Applicant's Name]</strong>,</p>
            <p>Thank you for your recent visa application. This is an update on the status of your request for entry into [Country Name].</p>

            <div class="bg-gray-50 border-l-4 border-[#1a428a] p-4 my-6 rounded-md">
                <p class="my-1"><strong>Application Reference:</strong> [Application Reference Number]</p>
                <p class="my-1"><strong>Passport Number:</strong> [Applicant's Passport Number]</p>
                <p class="my-1"><strong>Date of Submission:</strong> [Date]</p>
            </div>

            <!-- Choose one of the following main message blocks and uncomment it. -->

            <!--
            --- Visa Approved Message ---
            <p>We are pleased to inform you that your visa application has been <strong class="text-green-600">APPROVED</strong>. You may now proceed with your travel plans.</p>
            <p>Your visa is valid for [Number of Days/Months/Years] from [Start Date] and allows for [Single/Multiple] entries. You will receive your passport with the visa stamp at the address provided during your application within [Number] business days.</p>
            <p>Please review the visa sticker upon receipt to ensure all details are correct. Have a safe and pleasant journey!</p>
            -->

            <!--
            --- Application Under Review/Pending Message ---
            <p>Your application is currently under review by our consular officers. We will notify you as soon as a decision is made.</p>
            <p>Please note that processing times vary depending on the type of visa and the volume of applications. We appreciate your patience.</p>
            -->

            <!--
            --- Request for Additional Documents Message ---
            <p>We are currently processing your application but require additional documents to proceed. Please provide the following items:</p>
            <ul class="list-disc list-inside">
                <li>[Document 1: e.g., Your flight itinerary and accommodation details]</li>
                <li>[Document 2: e.g., A recent bank statement covering the last three months]</li>
                <li>[Document 3: e.g., An official invitation letter from your host]</li>
            </ul>
            <p>Please upload these documents through your online application portal within [Number] business days. Failure to provide this information in a timely manner may result in a delay or the refusal of your application.</p>
            -->

            <!--
            --- Visa Denied Message ---
            <p>We regret to inform you that your visa application has been <strong class="text-red-600">DENIED</strong>. This decision was based on a thorough review of your application and supporting documents. The specific reason for the refusal is:</p>
            <p><strong>[Reason for Denial: e.g., Insufficient proof of financial means to support your stay.]</strong></p>
            <p>You may be able to appeal this decision or reapply. For more information, please refer to our official website or contact us directly using the information below.</p>
            -->

            <p>For more details or to track your application, please visit our official website or your application portal using the link below.</p>

            <div class="mt-8">
                <p>Sincerely,</p>
                <p>The [Embassy/Consulate/Agency Name] Team</p>
            </div>
        </div>
        <div class="text-center p-8">
            <a href="[Link to Application Portal]" class="inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded-md no-underline transition-colors hover:bg-blue-700">View My Application</a>
        </div>
        <div class="bg-gray-200 text-gray-600 text-center p-5 text-xs">
            <p class="m-0">This is an automated notification. Do not reply to this email.</p>
            <p class="m-0">For more information, visit our website at <a href="[Link to Official Website]" class="text-blue-800 no-underline">[Official Website URL]</a>.</p>
        </div>
    </div>
</div>`;

    await this.visaRepository.save(visa);

    await this.emailService.sendEmail(
      user.email,
      'Your Visa Applicant Status',
      html,
    );
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
}
