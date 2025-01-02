import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq'

import {QuoteRepository} from './quote.repository';
import {DataQuote, Publication , DataQueryQuote} from '@project/typs';
import {BlogQuoteEntity} from './blog-quote.entity';
import {UpdateQuoteDto, QuoteRdo} from './index';
import {filterTags, fillDTO, getFullServerPath} from '@project/helpers';
import {State, RabbitRouting} from '@project/enum';
import {NotifyConfig, RabbitmqConnection} from '@project/config-notify';
import {UserConfig} from '@project/config-user';
import {GLOBAL_PEFIX} from '@project/consts';

@Injectable()
export class QuoteService {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {}

  public async create(dto: DataQuote, newsletter: boolean): Promise<QuoteRdo> {
    let dataAuthor:{
      id: string,
      name: string,
      email: string,
      avatar: string
    };
    const tagsList = filterTags(dto.tags);
    const dataQuote = new BlogQuoteEntity({
      ...dto,
      tags: tagsList
    });

    const _dataQuote = await this.quoteRepository.create(dataQuote);
    const filterDataQuote = fillDTO(QuoteRdo, _dataQuote);

    if(newsletter && filterDataQuote.additional.state === State.Published) {
        dataAuthor = await this.amqpConnection.request<{
          id: string,
          name: string,
          email: string,
          avatar: string
        }>({
          exchange: this.config.get('EXCHANG_NAME'),
          routingKey: RabbitRouting.AddSubscriber,
          payload: {...filterDataQuote}
        })
    }else {
      return filterDataQuote
    }

      delete filterDataQuote.additional.idUser;

        return {
          ...filterDataQuote,
          additional: {
            ...filterDataQuote.additional,
            author: {
              ...dataAuthor,
              avatar: dataAuthor.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${dataAuthor.avatar}` : dataAuthor.avatar
            }
          }
        }
  }

  public async show(idQuote: number): Promise<Publication | Publication[]> {
    const dataQuote = await this.quoteRepository.show(idQuote);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataQuote.additional.idUser]
    })

    const _dataVideo = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataQuote,
      dataAuthor
    )

    return _dataVideo
  }

  public async editing(query: DataQueryQuote, dto: UpdateQuoteDto): Promise<Publication | Publication[]> {
    const tagsList = filterTags(dto.tags);
    const dataQuote = await this.quoteRepository.editing(
      query,
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
      payload: [dataQuote.additional.idUser]
    })

    const _dataVideo = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataQuote,
      dataAuthor
    )

    return _dataVideo
  }

  public async delet(query: DataQueryQuote): Promise<Publication | Publication[]> {
    const dataQuote = await this.quoteRepository.delet(query);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataQuote.additional.idUser]
    })

    const _dataVideo = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataQuote,
      dataAuthor
    )

    return _dataVideo
  }
}
