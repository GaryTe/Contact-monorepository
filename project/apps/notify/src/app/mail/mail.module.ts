import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { getSmtpOptions } from '@project/config-notify';
import { MailService } from './mail.service';
import {ConfigNotifyModule} from '@project/config-notify';

@Module({
  imports: [
    MailerModule.forRootAsync(getSmtpOptions()),
    ConfigNotifyModule
  ],
  providers: [
    MailService
  ],
  exports: [
    MailService
  ]
})
export class MailModule {}
