import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {PhotoRepository} from './photo.repository';
import {DataPhoto, Publication , DataQueryPhoto} from '@project/typs';
import {BlogPhotoEntity} from './blog-photo.entity';
import {UpdatePhotoDto, PhotoRdo} from './index';
import {filterTags, fillDTO, getFullServerPath} from '@project/helpers';
import {State, RabbitRouting} from '@project/enum';
import {NotifyConfig, RabbitmqConnection} from '@project/config-notify';
import {GLOBAL_PEFIX} from '@project/consts';
import {UserConfig} from '@project/config-user';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {}

  public async create(dto: DataPhoto, newsletter: boolean): Promise<PhotoRdo> {
    let dataAuthor:{
      id: string,
      name: string,
      email: string,
      avatar: string
    };
    const tagsList = filterTags(dto.tags);
    const dataPhoto = new BlogPhotoEntity({
      ...dto,
      tags: tagsList
    });

    const _dataPhoto = await this.photoRepository.create(dataPhoto);
    const filterDataPhoto = fillDTO(PhotoRdo, _dataPhoto);

    if(newsletter && filterDataPhoto.additional.state === State.Published) {
        dataAuthor = await this.amqpConnection.request<{
          id: string,
          name: string,
          email: string,
          avatar: string
        }>({
          exchange: this.config.get('EXCHANG_NAME'),
          routingKey: RabbitRouting.AddSubscriber,
          payload: {...filterDataPhoto}
        })
    }else {
      return filterDataPhoto
    }

    delete filterDataPhoto.additional.idUser;

    return {
      ...filterDataPhoto,
      additional: {
        ...filterDataPhoto.additional,
        author: {
          ...dataAuthor,
          avatar: dataAuthor.avatar ? `${getFullServerPath(this.userConfig.get('HOST'), this.userConfig.get('PORT'))}/${GLOBAL_PEFIX}${dataAuthor.avatar}` : dataAuthor.avatar
        }
      }
    }
  }

  public async show(idPhoto: number): Promise<Publication | Publication[]> {
    const dataPhoto = await this.photoRepository.show(idPhoto);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataPhoto.additional.idUser]
    })

    const _dataPhoto = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataPhoto,
      dataAuthor
    )

    return _dataPhoto
  }

  public async editing(query: DataQueryPhoto, dto: UpdatePhotoDto): Promise<Publication | Publication[]> {
    const tagsList = filterTags(dto.tags);
    const dataPhoto = await this.photoRepository.editing(
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
      payload: [dataPhoto.additional.idUser]
    })

    const _dataPhoto = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataPhoto,
      dataAuthor
    )

    return _dataPhoto
  }

  public async delet(query: DataQueryPhoto): Promise<Publication | Publication[]> {
    const dataPhoto = await this.photoRepository.delet(query);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataPhoto.additional.idUser]
    })

    const _dataPhoto = new RabbitmqConnection(
      this.userConfig
    ).execute(
      dataPhoto,
      dataAuthor
    )

    return _dataPhoto
  }
}
