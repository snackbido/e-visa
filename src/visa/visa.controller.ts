import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VisaService } from './visa.service';
import { Visa } from './entity/visa.entity';
import { CreateVisaDto } from './dto/create-visa.dto';
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
  async createVisa(@Body() visaDto: CreateVisaDto): Promise<Visa> {
    return await this.visaService.create(visaDto);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: UpdateVisaDto) {
    return await this.visaService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.visaService.delete(id);
  }
}
