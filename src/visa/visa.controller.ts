import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VisaService } from './visa.service';
import { Visa } from './entity/visa.entity';
import { CreateVisaDto } from './dto/create-visa.dto';
import { GetUser } from '@visa/auth/get-user.decorator';
import { User } from '@visa/user/entity/user.entity';
import { JwtAuthGuard } from '@visa/auth/auth.guard';

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
  ): Promise<string> {
    return await this.visaService.create(visaDto, user);
  }
}
