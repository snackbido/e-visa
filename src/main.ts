/* eslint-disable @typescript-eslint/no-floating-promises */
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@visa/app.module';
import { GlobalExceptionFilter } from '@visa/config/exception/filter.exception';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@visa/config/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.enableCors({ origin: process.env.CLIENT_URL_PROD, credentials: true });
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
