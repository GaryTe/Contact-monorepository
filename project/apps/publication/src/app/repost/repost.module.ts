import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {RepostController} from './repost.controller';
import {RepostService} from './repost.service';
import {RepostRepository} from './repost.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';
import {ConfigNotifyModule} from '@project/config-notify';
import {getRabbitMQOptions} from '@project/config-notify';

@Module({
  imports: [
    PrismaClientModule,
    ConfigUserModule,
    ConfigUserModule,
    ConfigNotifyModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions()
    )
  ],
  controllers: [RepostController],
  providers: [
    RepostRepository,
    RepostService
  ]
})
export class RepostModule {}
