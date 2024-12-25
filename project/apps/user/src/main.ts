import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express from 'express';

import { AppModule } from './app/app.module';
import {UserConfig} from '@project/config-user';
import {GLOBAL_PEFIX} from '@project/consts';
import {STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE} from '@project/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new UserConfig()

  app.use(
    `/${GLOBAL_PEFIX}${STATIC_FILES_ROUTE}`,
    express.static(config.get('STATIC_DIRECTORY'))
  );
  app.use(
    `/${GLOBAL_PEFIX}${STATIC_UPLOAD_ROUTE}`,
    express.static(config.get('UPLOAD_DIRECTORY'))
  );

  app.setGlobalPrefix(GLOBAL_PEFIX);
  app.useGlobalPipes(new ValidationPipe())

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
