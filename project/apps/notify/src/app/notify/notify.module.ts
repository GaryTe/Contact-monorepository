import { Module } from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {MongooseModule} from '@nestjs/mongoose';

import { NotifyController } from './notify.controller';
import {NotifyService} from './notify.service';
import {NotifyRepository} from './notify.repository';
import {getRabbitMQOptions} from '@project/config-notify';
import {NotifyModel, NotifySchema} from './notify.model';
import {MailModule} from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([
      { name: NotifyModel.name, schema: NotifySchema }
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions()
    )
  ],
  controllers: [NotifyController],
  providers: [NotifyController, NotifyService, NotifyRepository]
})
export class NotifyModule {}
