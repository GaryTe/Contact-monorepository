import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {VideoRepository} from './video.repository';
import {DataVideo,Publication , DataQueryVideo} from '@project/typs';
import {BlogVideoEntity} from './blog-video.entity';
import {UpdateVideoDto, VideoRdo} from './index';
import {filterTags, fillDTO} from '@project/helpers';
import {RabbitRouting, State} from '@project/enum';
import {NotifyConfig} from '@project/config-notify';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig
  ) {}

  public async create(dto: DataVideo, newsletter: boolean): Promise<VideoRdo> {
    const tagsList = filterTags(dto.tags);
    const dataVideo = new BlogVideoEntity({
      ...dto,
      tags: tagsList
    });

    const _dataVideo = await this.videoRepository.create(dataVideo);
    const filterDataVideo = fillDTO(VideoRdo, _dataVideo);

    if(newsletter && filterDataVideo.additional.state === State.Published) {
        await this.amqpConnection.publish(
          this.config.get('EXCHANG_NAME'),
          RabbitRouting.AddSubscriber,
          {...filterDataVideo}
        )
      }

        return filterDataVideo
  }

  public async show(idVideo: number): Promise<Publication> {
    return await this.videoRepository.show(idVideo);
  }

  public async editing(query: DataQueryVideo, dto: UpdateVideoDto): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    return await this.videoRepository.editing(
      query,
      {...dto, tags: tagsList}
    );
  }

  public async delet(query: DataQueryVideo): Promise<Publication> {
    return await this.videoRepository.delet(query);
  }
}
