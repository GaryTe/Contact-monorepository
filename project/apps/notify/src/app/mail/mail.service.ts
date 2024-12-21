import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { SUBJECT } from '@project/consts';
import {NotifyConfig} from '@project/config-notify';
import {DataPublication} from '@project/typs';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: NotifyConfig
  ) {}

  public async sendNewNotify(dataPublication: DataPublication) {
    await this.mailerService.sendMail({
      from: this.config.get('SMTP_FROM'),
      to: dataPublication.subscriber.email,
      subject: SUBJECT,
      template: './publication.hbs',
      context: {
        name: `${dataPublication.publication.additional.name}`,
        author: `${dataPublication.publication.additional.author.name}`,
        dataPublication: `${dataPublication.publication.additional.dataPublication}`,
        likes: `${dataPublication.publication.additional.likes}`,
        comments: `${dataPublication.publication.additional.comments}`
      }
    })
  }
}
