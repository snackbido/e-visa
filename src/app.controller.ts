import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '@visa/app.service';
import { ImageValidationPipe } from './config/pipe/image.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  getHello(
    @UploadedFile(ImageValidationPipe) file: Express.Multer.File,
  ): string {
    console.log(file);
    return this.appService.getHello();
  }
}
