import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {RepostRepository} from './repost.repository';
import {DataQueryRepost, Publication} from '@project/typs';
import {UserConfig} from '@project/config-user';
import {NotifyConfig, RabbitmqConnection} from '@project/config-notify'
import {RabbitRouting} from '@project/enum';

@Injectable()
export class RepostService {
  constructor(
    private readonly repostRepository: RepostRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {}

  public async create(query: DataQueryRepost): Promise<Publication | Publication[]> {
    const dataRepost = await this.repostRepository.create(query);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataRepost.additional.idUser, dataRepost.additional.originalIdUser]
    })

    const _dataRepost = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataRepost,
      dataAuthor
    )

    return _dataRepost
  }
}
