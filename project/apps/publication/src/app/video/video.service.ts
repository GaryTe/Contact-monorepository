import { Injectable } from '@nestjs/common';

import {VideoRepository} from './video.repository';
import {DataVideo,Publication , DataQueryVideo} from '@project/typs';
import {BlogVideoEntity} from './blog-video.entity';
import {UpdateVideoDto} from './index';
import {filterTags} from '@project/helpers';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository
  ) {}

  public async create(dto: DataVideo): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    const dataVideo = new BlogVideoEntity({
      ...dto,
      tags: tagsList
    });

    return await this.videoRepository.create(dataVideo);
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
