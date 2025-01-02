import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {FindPublicationRepository} from './find-publication.repository';
import {Publication} from '@project/typs';
import {GLOBAL_PEFIX} from '@project/consts';
import {getFullServerPath} from '@project/helpers';
import {UserConfig} from '@project/config-user';
import {NotifyConfig, RabbitmqConnection} from '@project/config-notify';
import {RabbitRouting} from '@project/enum';


@Injectable()
export class FindPublicationService {
  constructor(
    private readonly findPublicationRepository: FindPublicationRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {}

  public async findPublication(word: string): Promise<Publication[] | []> {
    const dataAuthorList = []
    const dataPublicationsList = await this.findPublicationRepository.findPublication(word);

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
}
