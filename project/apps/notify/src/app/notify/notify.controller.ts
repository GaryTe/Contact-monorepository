import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import {RabbitRouting, Exchange, Queue} from '@project/enum';
import {NotifyService} from './notify.service';
import {Publication} from '@project/typs';
import {NotifyModel} from './notify.model';
import {MailService} from '../mail/mail.service';
import {DataPublication} from '@project/typs';

@Controller()
export class NotifyController {
  constructor(
    private readonly  notifyService: NotifyService,
    private readonly  mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: Exchange.ReadmeNotify,
    routingKey: RabbitRouting.AddSubscriber,
    queue: Queue.ReadmeNotify,
  })
  public async getData(publication: Publication): Promise<void> {
   const dataUsersList = await this.notifyService.searchUsersList(publication.additional.idUser)

   dataUsersList.subscribers.forEach((user: NotifyModel) =>{
    if(user.id === dataUsersList.author.id) {return}
    delete publication.additional.idUser;

    const dataPublication = {
        subscriber: {
          name: user.name,
          email: user.email
        },
        publication: {
          ...publication,
          additional: {
            ...publication.additional,
            author: {
              id: dataUsersList.author.id,
              name: dataUsersList.author.name,
              email: dataUsersList.author.email
            }
          }
          }
        } as unknown as DataPublication

    this.mailService.sendNewNotify(dataPublication)
   })
  }
}
