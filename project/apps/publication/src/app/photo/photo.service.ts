import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {PhotoRepository} from './photo.repository';
import {DataPhoto, Publication , DataQueryPhoto} from '@project/typs';
import {BlogPhotoEntity} from './blog-photo.entity';
import {UpdatePhotoDto, PhotoRdo} from './index';
import {filterTags, fillDTO} from '@project/helpers';
import {State, RabbitRouting} from '@project/enum';
import {NotifyConfig} from '@project/config-notify';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig
  ) {}

  public async create(dto: DataPhoto, newsletter: boolean): Promise<PhotoRdo> {
    const tagsList = filterTags(dto.tags);
    const dataPhoto = new BlogPhotoEntity({
      ...dto,
      tags: tagsList
    });

    const _dataPhoto = await this.photoRepository.create(dataPhoto);
    const filterDataPhoto = fillDTO(PhotoRdo, _dataPhoto);

    if(newsletter && filterDataPhoto.additional.state === State.Published) {
        await this.amqpConnection.publish(
          this.config.get('EXCHANG_NAME'),
          RabbitRouting.AddSubscriber,
          {...filterDataPhoto}
        )
    }

    return filterDataPhoto
  }

  public async show(idPhoto: number): Promise<Publication> {
    return await this.photoRepository.show(idPhoto);
  }

  public async editing(query: DataQueryPhoto, dto: UpdatePhotoDto): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    return await this.photoRepository.editing(
      query,
      {...dto, tags: tagsList}
    );
  }

  public async delet(query: DataQueryPhoto): Promise<Publication> {
    return await this.photoRepository.delet(query);
  }
}
