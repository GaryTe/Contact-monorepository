import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {TextController} from './text.controller';
import {TextService} from './text.service';
import {TextRepository} from './text.repository';
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
  controllers: [TextController],
  providers: [
    TextRepository,
    TextService
  ]
})
export class TextModule {}
