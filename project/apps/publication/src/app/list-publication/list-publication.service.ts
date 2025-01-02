import { Injectable } from '@nestjs/common';
import {AmqpConnection, RabbitRPC} from '@golevelup/nestjs-rabbitmq';

import {ListPublicationRepository} from './list-publication.repository';
import {Publication, DataQueryList, } from '@project/typs';
import {Counter, RabbitRouting, Exchange, Queue} from '@project/enum';
import {GLOBAL_PEFIX} from '@project/consts';
import {getFullServerPath} from '@project/helpers';
import {UserConfig} from '@project/config-user';
import {NotifyConfig, RabbitmqConnection} from '@project/config-notify';


@Injectable()
export class ListPublicationService {
  private limit;
  private page;
  constructor(
    private readonly listPublicationRepository: ListPublicationRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {
    this.limit = Counter.TwentyFive;
    this.page = Counter.Zero;
  }

  public async index(query: DataQueryList): Promise<Publication[] | []> {
    const dataAuthorList = []
    const dataPublicationsList = await this.listPublicationRepository.index({
      ...query,
      limit: this.limit,
      page: this.page
    });

    if(!dataPublicationsList.length) {
      this.limit = Counter.TwentyFive;
      this.page = Counter.Zero;
    }else{
      this.limit += Counter.TwentyFive;
      this.page += Counter.TwentyFive;
    }

    dataPublicationsList.forEach((index: Publication) => {
      if(index.additional.idUser) {
      dataAuthorList.push(index.additional.idUser)
      }
      if(index.additional.originalIdUser){
        dataAuthorList.push(index.additional.originalIdUser)
      }
    })

    const dataAuthor = await this.amqpConnection.request<{
          id: string,
          name: string,
          email: string,
          avatar: string
        }[] | null>({
          exchange: this.config.get('EXCHANG_PUBLICATION'),
          routingKey: RabbitRouting.AddUser,
          payload: dataAuthorList
        })

        const _dataPublicationsList = await new RabbitmqConnection(
          this.userConfig
        ).execute(
          dataPublicationsList,
          dataAuthor
        )

        if(!Array.isArray(_dataPublicationsList)) {
          throw new Error('const _dataPublicationsList is not an array, at (project/apps/publication/src/app/list-publication/list-publication.service.ts)')
        }

    _dataPublicationsList.map((publication: Publication) => {
      if(publication.photo) {
        return {
          ...publication,
          photo: `${getFullServerPath(process.env.HOST, process.env.PUBLICATION_PORT)}/${GLOBAL_PEFIX}${publication.photo}`
        }
      }

      return publication
    })

    return _dataPublicationsList as Publication[]
  }

  public async list(idUser: string): Promise<Publication[] | []> {
    const dataAuthorList = []
    const dataPublicationsList = await this.listPublicationRepository.list({
      idUser,
      limit: this.limit,
      page: this.page
    });

    if(!dataPublicationsList.length) {
      this.limit = Counter.TwentyFive;
      this.page = Counter.Zero;
    }else{
      this.limit += Counter.TwentyFive;
      this.page += Counter.TwentyFive;
    }

    dataPublicationsList.forEach((index: Publication) => {
      if(index.additional.idUser) {
      dataAuthorList.push(index.additional.idUser)
      }
      if(index.additional.originalIdUser){
        dataAuthorList.push(index.additional.originalIdUser)
      }
    })

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: dataAuthorList
    })

    const _dataPublicationsList = await new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataPublicationsList,
      dataAuthor
    )

    if(!Array.isArray(_dataPublicationsList)) {
      throw new Error('const _dataPublicationsList is not an array, at (project/apps/publication/src/app/list-publication/list-publication.service.ts)')
    }

    _dataPublicationsList.map((publication: Publication) => {
      if(publication.photo) {
        return {
          ...publication,
          photo: `${getFullServerPath(process.env.HOST, process.env.PUBLICATION_PORT)}/${GLOBAL_PEFIX}${publication.photo}`
        }
      }
      return publication
    })
    return _dataPublicationsList as Publication[]
  }

  @RabbitRPC({
    exchange: Exchange.ReadmeUser,
    routingKey: RabbitRouting.AddUser,
    queue: Queue.ReadmeUser
  })
  public async publicationList(idUser: string): Promise<Publication[] | []> {
    const dataPublicationsList = await this.listPublicationRepository
    .publicationList({
      idUser
    });

    return dataPublicationsList
  }
}
