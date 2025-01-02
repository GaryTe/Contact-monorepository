import { Controller } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

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

  @RabbitRPC({
    exchange: Exchange.ReadmeNotify,
    routingKey: RabbitRouting.AddSubscriber,
    queue: Queue.ReadmeNotify,
  })
  public async getData(publication: Publication): Promise<{
    id: string,
    name: string,
    email: string,
    avatar: string
  }> {
    let dataAuthor:{
      id: string,
      name: string,
      email: string,
      avatar: string
    };
   const dataUsersList = await this.notifyService.searchUsersList(publication.additional.idUser)

   dataUsersList.subscribers.forEach((user: NotifyModel) =>{
    if(user.id === dataUsersList.author.id) {
      dataAuthor = {
        id: dataUsersList.author.id,
        name: dataUsersList.author.name,
        email: dataUsersList.author.email,
        avatar: dataUsersList.author.avatar
      }
      return
    }
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
              email: dataUsersList.author.email,
              avatar: dataUsersList.author.avatar
            }
          }
          }
        } as unknown as DataPublication

    this.mailService.sendNewNotify(dataPublication)
   })

   return dataAuthor
  }
}
