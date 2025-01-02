import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {VideoRepository} from './video.repository';
import {DataVideo, Publication , DataQueryVideo} from '@project/typs';
import {BlogVideoEntity} from './blog-video.entity';
import {UpdateVideoDto, VideoRdo} from './index';
import {filterTags, fillDTO} from '@project/helpers';
import {RabbitRouting, State} from '@project/enum';
import {NotifyConfig, RabbitmqConnection} from '@project/config-notify';
import {getFullServerPath} from '@project/helpers';
import {UserConfig} from '@project/config-user';
import {GLOBAL_PEFIX} from '@project/consts';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {}

  public async create(dto: DataVideo, newsletter: boolean): Promise<VideoRdo> {
    let dataAuthor:{
      id: string,
      name: string,
      email: string,
      avatar: string
    };
    const tagsList = filterTags(dto.tags);
    const dataVideo = new BlogVideoEntity({
      ...dto,
      tags: tagsList
    });

    const _dataVideo = await this.videoRepository.create(dataVideo);
    const filterDataVideo = fillDTO(VideoRdo, _dataVideo);

    if(newsletter && filterDataVideo.additional.state === State.Published) {
        dataAuthor = await this.amqpConnection.request<{
          id: string,
          name: string,
          email: string,
          avatar: string
        }>({
          exchange: this.config.get('EXCHANG_NAME'),
          routingKey: RabbitRouting.AddSubscriber,
          payload: {...filterDataVideo}
        })
      }else {
        return filterDataVideo
      }

      delete filterDataVideo.additional.idUser;

        return {
          ...filterDataVideo,
          additional: {
            ...filterDataVideo.additional,
            author: {
              ...dataAuthor,
              avatar: dataAuthor.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${dataAuthor.avatar}` : dataAuthor.avatar
            }
          }
        }
  }

  public async show(idVideo: number): Promise<Publication | Publication[]> {
    const dataVideo = await this.videoRepository.show(idVideo);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataVideo.additional.idUser]
    })

    const _dataVideo = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataVideo,
      dataAuthor
    )

    return _dataVideo
  }

  public async editing(query: DataQueryVideo, dto: UpdateVideoDto): Promise<Publication | Publication[]> {
    const tagsList = filterTags(dto.tags);
    const dataVideo = await this.videoRepository.editing(
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
      payload: [dataVideo.additional.idUser]
    })

    const _dataVideo = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataVideo,
      dataAuthor
    )

    return _dataVideo
  }

  public async delet(query: DataQueryVideo): Promise<Publication | Publication[]> {
    const dataVideo = await this.videoRepository.delet(query);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataVideo.additional.idUser]
    })

    const _dataVideo = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataVideo,
      dataAuthor
    )

    return _dataVideo
  }
}
