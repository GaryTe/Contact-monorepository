import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {GLOBAL_PEFIX} from '@project/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PEFIX);

  const port = process.env.NOTIFY_PORT || 4500;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PEFIX}`
  );
  Logger.log(
    `🎯  Current mode: ${process.env.NODE_ENV}`
  )
}

bootstrap();
