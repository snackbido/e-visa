/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from '@visa/payment/payment.service';
import { Payment } from '@visa/payment/entity/payment.entity';
import { JwtAuthGuard } from '@visa/auth/auth.guard';
import { RolesGuard } from '@visa/auth/role.guard';
import { Roles } from '@visa/auth/roles.decorator';
import { ROLES } from '@visa/user/entity/user.entity';

@Controller('/api/payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles([ROLES.ADMIN])
  async getAll(): Promise<Payment[]> {
    return await this.paymentService.getPayments();
  }

  @Post('checkout')
  async initialPayment(@Ip() ip: string, @Body() body: any) {
    const amount = Number(body.amount); // default 25k VND
    const orderInfo = body.visa_id;
    const clientIp = ip || '127.0.0.1';
    const user = body.user_id;
    return await this.paymentService.initializePayment({
      amount,
      user_id: user,
      visa_id: orderInfo,
      payment_gate: body.payment_gate,
      payment_method: body.payment_method,
      customer_ip: clientIp,
    });
  }

  @Put('verify')
  async verifyPayment(@Body() body: any) {
    const merchTxnRef = body.merchTxnRef as string;
    const paymentGate = body.paymentGate as string;
    const orderInfo = body.orderInfo as string;
    return await this.paymentService.verifyPayment(
      merchTxnRef,
      paymentGate,
      orderInfo,
    );
  }

  // @Get('return')
  // handleReturn(@Query() query: Record<string, any>) {
  //   return this.paymentService.handleReturn(query);
  // }

  // @Post()
  // async create(@Body() paymentDto: PaymentDto): Promise<string> {
  //   return await this.paymentService.createPayment(paymentDto);
  // }
}
