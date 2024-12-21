import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {QuoteController} from './quote.controller';
import {QuoteService} from './quote.service';
import {QuoteRepository} from './quote.repository';
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
  controllers: [QuoteController],
  providers: [
    QuoteRepository,
    QuoteService
  ]
})
export class QuoteModule {}
