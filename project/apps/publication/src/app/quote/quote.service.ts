import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq'

import {QuoteRepository} from './quote.repository';
import {DataQuote, Publication , DataQueryQuote} from '@project/typs';
import {BlogQuoteEntity} from './blog-quote.entity';
import {UpdateQuoteDto, QuoteRdo} from './index';
import {filterTags, fillDTO} from '@project/helpers';
import {State, RabbitRouting} from '@project/enum';
import {NotifyConfig} from '@project/config-notify';

@Injectable()
export class QuoteService {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig
  ) {}

  public async create(dto: DataQuote, newsletter: boolean): Promise<QuoteRdo> {
    const tagsList = filterTags(dto.tags);
    const dataQuote = new BlogQuoteEntity({
      ...dto,
      tags: tagsList
    });

    const _dataQuote = await this.quoteRepository.create(dataQuote);
    const filterDataQuote = fillDTO(QuoteRdo, _dataQuote);

    if(newsletter && filterDataQuote.additional.state === State.Published) {
        await this.amqpConnection.publish(
          this.config.get('EXCHANG_NAME'),
          RabbitRouting.AddSubscriber,
          {...filterDataQuote}
        )
    }

    return filterDataQuote
  }

  public async show(idQuote: number): Promise<Publication> {
    return await this.quoteRepository.show(idQuote);
  }

  public async editing(query: DataQueryQuote, dto: UpdateQuoteDto): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    return await this.quoteRepository.editing(
      query,
      {...dto, tags: tagsList}
    );
  }

  public async delet(query: DataQueryQuote): Promise<Publication> {
    return await this.quoteRepository.delet(query);
  }
}
