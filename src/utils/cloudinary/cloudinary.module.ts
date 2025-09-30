import { Module } from '@nestjs/common';
import { CloudinaryProvider } from '@visa/utils/cloudinary/cloudinary.provider';
import { CloudinaryService } from '@visa/utils/cloudinary/cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
