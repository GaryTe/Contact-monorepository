import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { NotifyModule } from './notify/notify.module';
import {getMongooseOptions} from '@project/config-user';
import {ConfigNotifyModule} from '@project/config-notify';
import {MailModule} from './mail/mail.module';

@Module({
  imports: [
    NotifyModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    ConfigNotifyModule,
    MailModule
  ]
})
export class AppModule {}
