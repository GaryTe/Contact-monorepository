import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {TextRepository} from './text.repository';
import {DataText, Publication , DataQueryText} from '@project/typs';
import {BlogTextEntity} from './blog-text.entity';
import {UpdateTextDto, TextRdo} from './index';
import {filterTags, fillDTO} from '@project/helpers';
import {State, RabbitRouting} from '@project/enum';
import {NotifyConfig} from '@project/config-notify';

@Injectable()
export class TextService {
  constructor(
    private readonly textRepository: TextRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig
  ) {}

  public async create(dto: DataText, newsletter: boolean): Promise<TextRdo> {
    const tagsList = filterTags(dto.tags);
    const dataText = new BlogTextEntity({
      ...dto,
      tags: tagsList
    });

    const _dataText = await this.textRepository.create(dataText);
    const filterDataText = fillDTO(TextRdo, _dataText);

        if(newsletter && filterDataText.additional.state === State.Published) {
            await this.amqpConnection.publish(
              this.config.get('EXCHANG_NAME'),
              RabbitRouting.AddSubscriber,
              {...filterDataText}
            )
          }

    return filterDataText
  }

  public async show(idText: number): Promise<Publication> {
    return await this.textRepository.show(idText);
  }

  public async editing(query: DataQueryText, dto: UpdateTextDto): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    return await this.textRepository.editing(
      query,
      {...dto, tags: tagsList}
    );
  }

  public async delet(query: DataQueryText): Promise<Publication> {
    return await this.textRepository.delet(query);
  }
}
