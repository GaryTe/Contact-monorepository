import { Injectable } from '@nestjs/common';

import {VideoRepository} from './video.repository';
import {DataVideo,Publication , DataQueryVideo} from '@project/typs';
import {BlogVideoEntity} from './blog-video.entity';
import {UpdateVideoDto} from './index';

@Injectable()
export class VideoService {
  constructor(
    private readonly videoRepository: VideoRepository
  ) {}

  public async create(dto: DataVideo): Promise<Publication> {
    const dataVideo = new BlogVideoEntity(dto);

    return await this.videoRepository.create(dataVideo);
  }

  public async show(idVideo: number): Promise<Publication> {
    return await this.videoRepository.show(idVideo);
  }

  public async editing(query: DataQueryVideo, dto: UpdateVideoDto): Promise<Publication> {
    return await this.videoRepository.editing(query, dto);
  }

  public async delet(query: DataQueryVideo): Promise<Publication> {
    return await this.videoRepository.delet(query);
  }
}
