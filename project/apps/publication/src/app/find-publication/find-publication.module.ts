import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {FindPublicationRepository} from './find-publication.repository';
import {FindPublicationService} from './find-publication.service';
import {FindPublicationController} from './find-publication.controller';
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
  controllers: [FindPublicationController],
  providers: [
    FindPublicationRepository,
    FindPublicationService
  ]
})
export class FindPublicationModule {}
