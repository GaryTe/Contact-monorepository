import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ListPublicationController} from './list-publication.controller';
import {ListPublicationRepository} from './list-publication.repository';
import {ListPublicationService} from './list-publication.service';
import {ConfigUserModule} from '@project/config-user';
import {ConfigNotifyModule, getRabbitMQOptions} from '@project/config-notify';

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
  controllers: [ListPublicationController],
  providers: [
    ListPublicationRepository,
    ListPublicationService
  ]
})
export class ListPublicationModule {}
