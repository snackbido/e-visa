import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VisaService } from './visa.service';
import { Visa } from './entity/visa.entity';
import { CreateVisaDto } from './dto/create-visa.dto';
import { GetUser } from '@visa/auth/get-user.decorator';
import { User } from '@visa/user/entity/user.entity';
import { JwtAuthGuard } from '@visa/auth/auth.guard';
import { UpdateVisaDto } from './dto/update-visa.dto';

@Controller('/api/visa')
@UseGuards(JwtAuthGuard)
export class VisaController {
  constructor(private visaService: VisaService) {}

  @Get()
  async getAllVisa(): Promise<Visa[]> {
    return await this.visaService.getAllVisa();
  }

  @Get('/history/:userId')
  async getHistoryVisa(@Param('userId') userId: string): Promise<Visa[]> {
    return await this.visaService.getHistoryVisa(userId);
  }

  @Get('/:id')
  async getVisa(@Param('id') id: string): Promise<Visa> {
    return await this.visaService.getVisa(id);
  }

  @Post()
  async createVisa(
    @Body() visaDto: CreateVisaDto,
    @GetUser() user: User,
  ): Promise<Visa> {
    return await this.visaService.create(visaDto, user);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateVisaDto) {
    return await this.visaService.update(id, body);
  }
}
