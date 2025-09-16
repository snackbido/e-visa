/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@visa/auth/config/jwt.payload';
import { AuthCredential } from '@visa/auth/dto/authCredential.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '@visa/user/user.service';
import { ResetPasswordDto } from '@visa/auth/dto/resetPassword.dto';
import { ForgotPasswordDto } from '@visa/auth/dto/forgotPassword.dto';
import { EmailService } from '@visa/utils/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@visa/repository/user.repository';
import { User } from '@visa/user/entity/user.entity';
import { LoginDto } from '@visa/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async validate({ id }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async login({ email, password }: LoginDto): Promise<{ user; token }> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('Incorrect Email');

    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Incorrect password');

    user.password = '';

    const payload: JwtPayload = { id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async register(authCredential: AuthCredential): Promise<string> {
    return await this.userService.createUser(authCredential);
  }

  async forgotPassword({ email }: ForgotPasswordDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('Email does not exist');

    const payload: JwtPayload = { id: user.id, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: 'jwt-secret',
      expiresIn: '15m',
    });

    const url = `${process.env.CLIENT_URL}/user/reset-password/${token}`;
    const html = `<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
          <td>
            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                      <a href="https://rakeshmandal.com" title="logo" target="_blank">
                        <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                      </a>
                    </td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:0 35px;">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                        requested to reset your password</h1>
                                    <span
                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                        We cannot simply send you your old password. A unique link to reset your
                                        password has been generated for you. To reset your password, click the
                                        following link and follow the instructions.
                                    </p>
                                    <a href="${url}"
                                        style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                        Password</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
    this.emailService.sendEmail(email, 'Reset Password', html);

    return 'Password reset link sent to your email. Please check your email box';
  }

  async resetPassword(
    token: string,
    { password, passwordConfirm }: ResetPasswordDto,
  ): Promise<string> {
    if (!token) throw new UnauthorizedException();

    const payload = (await this.jwtService.verify(token, {
      secret: 'jwt-secret',
    })) as JwtPayload;

    if (!payload) throw new BadRequestException('Invalid token');

    const user = await this.userRepository.findOneBy({ id: payload.id });
    const salt = bcrypt.genSaltSync(12);

    if (password !== passwordConfirm)
      throw new BadRequestException('Password not same with passwordConfirm');

    await this.userRepository.update(
      { id: user?.id },
      {
        password: bcrypt.hashSync(password, salt),
      },
    );

    return 'Your password changed successfully';
  }
}
