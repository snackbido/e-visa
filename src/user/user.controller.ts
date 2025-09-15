import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@visa/user/user.service';
import { User, ROLES } from '@visa/user/entity/user.entity';
import { JwtAuthGuard } from '@visa/auth/auth.guard';
import { UserDto } from '@visa/user/dto/user.dto';
import { ChangePasswordDto } from '@visa/user/dto/changePassword.dto';
import { GetUser } from '@visa/auth/get-user.decorator';
import { RolesGuard } from '@visa/auth/role.guard';
import { Roles } from '@visa/auth/roles.decorator';
import { updateDto } from '@visa/user/dto/update.dto';

@Controller('/api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  @HttpCode(200)
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getUser(id);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles([ROLES.ADMIN])
  async getAllUser(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: UserDto): Promise<string> {
    return await this.userService.createUser(userDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles([ROLES.ADMIN, ROLES.USER])
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: updateDto,
  ): Promise<string> {
    return await this.userService.updateUser(id, userDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles([ROLES.ADMIN, ROLES.USER])
  async deleteUser(@Param('id') id: string): Promise<string> {
    return await this.userService.deleteUser(id);
  }

  @Patch('/change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ): Promise<string> {
    return await this.userService.changePassword(user, changePasswordDto);
  }
}
