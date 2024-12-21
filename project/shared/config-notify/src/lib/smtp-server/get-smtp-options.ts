import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import * as path from 'node:path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import {NotifyConfig} from '../config/config-notify';
import {ConfigNotifyModule} from '../config/config-notify.module';

export function getSmtpOptions(): MailerAsyncOptions {
  return {
    imports: [ConfigNotifyModule],
    useFactory: async (config: NotifyConfig) => {
      return {
        transport: {
          host: config.get('RABBITMQ_HOST'),
          port: config.get('SMTP_PORT'),
          secure: false,
          auth: {
            user: config.get('RABBITMQ_USER'),
            pass: config.get('RABBITMQ_PASSWORD')
          }
        },
        defaults: {
          from: config.get('SMTP_FROM'),
        },
        template: {
          dir: path.resolve(__dirname, 'assets'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }
    },
    inject: [NotifyConfig],
  }
}
