import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {LinkRepository} from './link.repository';
import {DataLink, Publication , DataQueryLink} from '@project/typs';
import {BlogLinkEntity} from './blog-link.entity';
import {UpdateLinkDto, LinkRdo} from './index';
import {filterTags, fillDTO, getFullServerPath} from '@project/helpers';
import {State, RabbitRouting} from '@project/enum';
import {NotifyConfig, RabbitmqConnection} from '@project/config-notify';
import {UserConfig} from '@project/config-user';
import {GLOBAL_PEFIX} from '@project/consts';

@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {}

  public async create(dto: DataLink, newsletter: boolean): Promise<LinkRdo> {
    let dataAuthor:{
      id: string,
      name: string,
      email: string,
      avatar: string
    };
    const tagsList = filterTags(dto.tags);
    const dataLink = new BlogLinkEntity({
      ...dto,
      tags: tagsList
    });

    const _dataLink = await this.linkRepository.create(dataLink);
    const filterDataLink = fillDTO(LinkRdo, _dataLink);

    if(newsletter && filterDataLink.additional.state === State.Published) {
        dataAuthor = await this.amqpConnection.request<{
          id: string,
          name: string,
          email: string,
          avatar: string
        }>({
          exchange: this.config.get('EXCHANG_NAME'),
          routingKey: RabbitRouting.AddSubscriber,
          payload: {...filterDataLink}
        })
    } else {
      return filterDataLink
    }

    delete filterDataLink.additional.idUser;

    return {
      ...filterDataLink,
      additional: {
        ...filterDataLink.additional,
        author: {
          ...dataAuthor,
          avatar: dataAuthor.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${dataAuthor.avatar}` : dataAuthor.avatar
        }
      }
    }
  }

  public async show(idLink: number): Promise<Publication | Publication[]> {
    const dataLink = await this.linkRepository.show(idLink);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataLink.additional.idUser]
    })

    const _dataLink = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataLink,
      dataAuthor
    )

    return _dataLink
  }

  public async editing(link: DataQueryLink, dto: UpdateLinkDto): Promise<Publication | Publication[]> {
    const tagsList = filterTags(dto.tags);
    const dataLink = await this.linkRepository.editing(
      link,
      {...dto, tags: tagsList}
    );

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataLink.additional.idUser]
    })

    const _dataLink = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataLink,
      dataAuthor
    )

    return _dataLink
  }

  public async delet(link: DataQueryLink): Promise<Publication | Publication[]> {
    const dataLink = await this.linkRepository.delet(link);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataLink.additional.idUser]
    })

    const _dataLink = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataLink,
      dataAuthor
    )

    return _dataLink
  }
}
