import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {PhotoController} from './photo.controller';
import {PhotoService} from './photo.service';
import {PhotoRepository} from './photo.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';
import {getRabbitMQOptions} from '@project/config-notify';
import {ConfigNotifyModule} from '@project/config-notify';
import {FileModule} from '@project/file'

@Module({
  imports: [
    PrismaClientModule,
    ConfigUserModule,
    ConfigNotifyModule,
    FileModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions()
    )
  ],
  controllers: [PhotoController],
  providers: [
    PhotoRepository,
    PhotoService
  ]
})
export class PhotoModule {}
