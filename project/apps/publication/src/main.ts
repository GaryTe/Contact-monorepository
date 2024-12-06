import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {GLOBAL_PEFIX} from '@project/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PEFIX);
  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PUBLICATION_PORT || 2500;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PEFIX}`
  );
  Logger.log(
    `🎯  Current mode: ${process.env.NODE_ENV}`
  )
}

bootstrap();
