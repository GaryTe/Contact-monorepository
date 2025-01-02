import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {TextRepository} from './text.repository';
import {DataText, Publication , DataQueryText} from '@project/typs';
import {BlogTextEntity} from './blog-text.entity';
import {UpdateTextDto, TextRdo} from './index';
import {filterTags, fillDTO, getFullServerPath} from '@project/helpers';
import {State, RabbitRouting} from '@project/enum';
import {NotifyConfig, RabbitmqConnection} from '@project/config-notify';
import {UserConfig} from '@project/config-user';
import {GLOBAL_PEFIX} from '@project/consts';

@Injectable()
export class TextService {
  constructor(
    private readonly textRepository: TextRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {}

  public async create(dto: DataText, newsletter: boolean): Promise<TextRdo> {
    let dataAuthor:{
      id: string,
      name: string,
      email: string,
      avatar: string
    };
    const tagsList = filterTags(dto.tags);
    const dataText = new BlogTextEntity({
      ...dto,
      tags: tagsList
    });

    const _dataText = await this.textRepository.create(dataText);
    const filterDataText = fillDTO(TextRdo, _dataText);

        if(newsletter && filterDataText.additional.state === State.Published) {
            dataAuthor = await this.amqpConnection.request<{
              id: string,
              name: string,
              email: string,
              avatar: string
            }>({
              exchange: this.config.get('EXCHANG_NAME'),
              routingKey: RabbitRouting.AddSubscriber,
              payload: {...filterDataText}
            })
          }else {
            return filterDataText
          }

          delete filterDataText.additional.idUser;

          return {
                    ...filterDataText,
                    additional: {
                      ...filterDataText.additional,
                      author: {
                        ...dataAuthor,
                        avatar: dataAuthor.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${dataAuthor.avatar}` : dataAuthor.avatar
                      }
                    }
                  }
  }

  public async show(idText: number): Promise<Publication | Publication[]> {
    const dataText = await this.textRepository.show(idText);

    const dataAuthor = await this.amqpConnection.request<{
          id: string,
          name: string,
          email: string,
          avatar: string
        }[] | null>({
          exchange: this.config.get('EXCHANG_PUBLICATION'),
          routingKey: RabbitRouting.AddUser,
          payload: [dataText.additional.idUser]
        })

        const _dataText = new RabbitmqConnection(
          this.userConfig
        ).execute(
          dataText,
          dataAuthor
        )

        return _dataText
  }

  public async editing(query: DataQueryText, dto: UpdateTextDto): Promise<Publication | Publication[]> {
    const tagsList = filterTags(dto.tags);
    const dataText = await this.textRepository.editing(
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
      payload: [dataText.additional.idUser]
    })

    const _dataText = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataText,
      dataAuthor
    )

    return _dataText
  }

  public async delet(query: DataQueryText): Promise<Publication | Publication[]> {
    const dataText = await this.textRepository.delet(query);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataText.additional.idUser]
    })

    const _dataText = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataText,
      dataAuthor
    )

    return _dataText
  }
}
