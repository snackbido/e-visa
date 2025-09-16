import { Module } from '@nestjs/common';
import { AuthService } from '@visa/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@visa/auth/auth.controller';
import { JwtStrategy } from '@visa/auth/config/jwt.strategy';
import { EmailService } from '@visa/utils/email.service';
import { DatabaseConfigModule } from '@visa/config/db/database.module';
import { UserService } from '@visa/user/user.service';
import { UserRepository } from '@visa/repository/user.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    EmailService,
    UserRepository,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
