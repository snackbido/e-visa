import { Module } from '@nestjs/common';
import { UserService } from '@visa/user/user.service';
import { UserController } from '@visa/user/user.controller';
import { AuthModule } from '@visa/auth/auth.module';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { UserRepository } from '@visa/repository/user.repository';

@Module({
  imports: [DatabaseConfigModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
