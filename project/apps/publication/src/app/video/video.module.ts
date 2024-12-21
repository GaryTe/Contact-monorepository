import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import {VideoRepository} from './video.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';
import {ConfigNotifyModule} from '@project/config-notify'
import {getRabbitMQOptions} from '@project/config-notify';

@Module({
  imports: [
    PrismaClientModule,
    ConfigUserModule,
    ConfigNotifyModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions()
    )
  ],
  controllers: [VideoController],
  providers: [
    VideoRepository,
    VideoService
  ]
})
export class VideoModule {}
