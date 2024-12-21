import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {LinkController} from './link.controller';
import {LinkService} from './link.service';
import {LinkRepository} from './link.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';
import {getRabbitMQOptions} from '@project/config-notify';
import {ConfigNotifyModule} from '@project/config-notify'

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
  controllers: [LinkController],
  providers: [
    LinkRepository,
    LinkService
  ]
})
export class LinkModule {}
