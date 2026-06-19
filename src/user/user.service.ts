import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '@visa/user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '@visa/user/dto/changePassword.dto';
import { updateDto } from '@visa/user/dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@visa/repository/user.repository';
import { User } from '@visa/user/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User does not exists');

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({ relations: ['visa'] });

    if (users.length <= 0) throw new NotFoundException('User does not exist');

    return users;
  }

  async createUser(userDto: UserDto): Promise<string> {
    const existingUser = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      nationality,
      role,
    } = userDto;

    if (existingUser) throw new BadRequestException('User already exists');

    const salt = bcrypt.genSaltSync(12);

    const user = this.userRepository.create({
      first_name,
      last_name,
      email,
      nationality,
      phone_number,
      password: bcrypt.hashSync(password, salt),
      role: role, // Cast or convert to the correct enum type
    });

    await this.userRepository.save(user);

    return 'Register successfully';
  }

  async updateUser(id: string, userDto: updateDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['visa'],
    });

    if (!user) throw new NotFoundException('User does not exist');
    user.email = userDto.email;
    user.first_name = userDto.first_name;
    user.last_name = userDto.last_name;
    user.phone_number = userDto.phone_number;
    user.nationality = userDto.nationality;
    await this.userRepository.save(user);

    return 'User updated successfully';
  }

  async deleteUser(id: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User does not exist');

    await this.userRepository.delete(id);
    return 'User delete successfully';
  }

  async changePassword(
    user: User,
    { currentPassword, newPassword }: ChangePasswordDto,
  ): Promise<string> {
    const currentUser = await this.userRepository.findOneBy({ id: user.id });

    if (!currentUser) throw new UnauthorizedException();

    if (!bcrypt.compareSync(currentPassword, currentUser.password))
      throw new BadRequestException('Current password is incorrect');

    if (currentPassword === newPassword)
      throw new BadRequestException(
        'New password must have different current password',
      );

    const salt = bcrypt.genSaltSync(12);
    await this.userRepository.update(
      { id: currentUser.id },
      {
        password: bcrypt.hashSync(newPassword, salt),
      },
    );
    return 'Change password successfully';
  }
}
