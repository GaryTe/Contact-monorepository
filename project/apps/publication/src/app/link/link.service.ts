import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {LinkRepository} from './link.repository';
import {DataLink, Publication , DataQueryLink} from '@project/typs';
import {BlogLinkEntity} from './blog-link.entity';
import {UpdateLinkDto, LinkRdo} from './index';
import {filterTags, fillDTO} from '@project/helpers';
import {State, RabbitRouting} from '@project/enum';
import {NotifyConfig} from '@project/config-notify';

@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig
  ) {}

  public async create(dto: DataLink, newsletter: boolean): Promise<LinkRdo> {
    const tagsList = filterTags(dto.tags);
    const dataLink = new BlogLinkEntity({
      ...dto,
      tags: tagsList
    });

    const _dataLink = await this.linkRepository.create(dataLink);
    const filterDataLink = fillDTO(LinkRdo, _dataLink);

    if(newsletter && filterDataLink.additional.state === State.Published) {
        await this.amqpConnection.publish(
          this.config.get('EXCHANG_NAME'),
          RabbitRouting.AddSubscriber,
          {...filterDataLink}
        )
    }

    return filterDataLink
  }

  public async show(idLink: number): Promise<Publication> {
    return await this.linkRepository.show(idLink);
  }

  public async editing(link: DataQueryLink, dto: UpdateLinkDto): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    return await this.linkRepository.editing(
      link,
      {...dto, tags: tagsList}
    );
  }

  public async delet(link: DataQueryLink): Promise<Publication> {
    return await this.linkRepository.delet(link);
  }
}
