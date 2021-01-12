import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // useGlobalPipes는 데이터 파이프 설정
  // ValidationPipe는 데이터 유효성검사.
  // whitelist: DTO decorator 없는 변수는 저장X,
  // forbidNonWhitelisted: DTO 포함안된 변수는 사용자에게 에러 메시지 날림.
  // transform은 개발자가 원하는 타입으로 자동 형변환.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
