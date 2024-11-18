import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {UserConfig} from '@project/config-user';
import {GLOBAL_PEFIX} from '@project/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new UserConfig()

  app.setGlobalPrefix(GLOBAL_PEFIX);
  const port = config.get('PORT');

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PEFIX}`
  );
  Logger.log(
    `🎯  Current mode: ${process.env.NODE_ENV}`
  )
}

bootstrap();
