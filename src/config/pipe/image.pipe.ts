/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const visionClient = new ImageAnnotatorClient();

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  private readonly MIN_WIDTH = 300;
  private readonly MIN_HEIGHT = 400;
  private readonly MAX_POSE_DEVIATION = 15;

  async transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File ảnh không được để trống.');
    }

    if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
      throw new BadRequestException(
        'Định dạng file không hợp lệ. Chỉ chấp nhận JPEG/PNG.',
      );
    }

    let metadata;
    try {
      metadata = await sharp(file.buffer).metadata();
    } catch (e) {
      throw new BadRequestException(
        `Không thể đọc dữ liệu hình ảnh (có thể file bị hỏng).${e} `,
      );
    }

    const { width, height } = metadata;

    if (width < this.MIN_WIDTH || height < this.MIN_HEIGHT) {
      throw new BadRequestException(
        `Ảnh quá nhỏ. Kích thước tối thiểu là ${this.MIN_WIDTH}x${this.MIN_HEIGHT} pixels.`,
      );
    }

    // Tỷ lệ lý tưởng cho ảnh chân dung 3x4 (Height / Width ≈ 1.333)
    // const ratio = height / width;
    // if (ratio < 1.25 || ratio > 1.4) {
    //   throw new BadRequestException(
    //     'Ảnh không đúng tỷ lệ 3x4 (chân dung). Vui lòng chọn ảnh đứng (Portrait).',
    //   );
    // }

    // -------------------------------------------
    // 3. PHÂN TÍCH NỘI DUNG (Dùng Google Vision AI)
    // -------------------------------------------
    const visionImage = {
      image: { content: file.buffer.toString('base64') },
    };

    const [result] = await visionClient.faceDetection(visionImage);
    const faces = result.faceAnnotations;

    if (!faces || faces.length === 0) {
      throw new BadRequestException(
        'Lỗi AI: Không phát hiện thấy khuôn mặt nào trong ảnh.',
      );
    }

    if (faces.length > 1) {
      throw new BadRequestException(
        `Lỗi: Ảnh có ${faces.length} khuôn mặt. Vui lòng chọn ảnh cá nhân.`,
      );
    }

    const face = faces[0];

    // Kiểm tra góc nghiêng (Roll, Yaw, Pitch)
    const rollAngle = face.rollAngle ?? 0;
    const yawAngle = face.panAngle ?? 0;

    if (
      Math.abs(rollAngle) > this.MAX_POSE_DEVIATION ||
      Math.abs(yawAngle) > this.MAX_POSE_DEVIATION
    ) {
      throw new BadRequestException(
        'Lỗi: Khuôn mặt bị nghiêng hoặc không chính diện. Vui lòng nhìn thẳng.',
      );
    }

    // *Tùy chọn: Có thể kiểm tra thêm face.detectionConfidence, face.joyLikelihood v.v.*

    // Nếu mọi thứ đều qua, trả về file để Controller xử lý tiếp
    return file;
  }
}
