import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';

import {CommentController} from './comment.controller';
import {CommentService} from './comment.service';
import {CommentRepository} from './comment.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
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
  controllers: [CommentController],
  providers: [
    CommentRepository,
    CommentService
  ]
})
export class CommentModule {}
