import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {BlogVideoEntity} from './blog-video.entity';
import {Publication, DataQueryVideo} from '@project/typs';
import {UpdateVideoDto} from './index';
import {TypePublication} from '@project/enum';

@Injectable()
export class VideoRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async create(entity: BlogVideoEntity): Promise<Publication> {
    const dataVideo = entity.getDataVideo;

    const record = await this.client.publication.create({
      data: {
          additional: {
            create: {
              ...dataVideo,
              type: TypePublication.Video,
              tags: dataVideo.tags ? dataVideo.tags.join(',') : undefined
            }
          },
        comments: {
          connect: []
        },
        likes: {
          connect: []
        }
      },
      include: {
        additional: true,
        comments: true,
        likes: true
      }
    });

    return record;
  }

  public async show(idVideo: number): Promise<Publication> {
    const dataVideo = await this.client.publication.findFirst({
      where: {id: idVideo},
      include: {
        additional: true,
        comments: true,
        likes: true
      }
    });

    if(!dataVideo) {
      throw new HttpException(
        `A video with this id: ${idVideo} not found`,
        HttpStatus.OK
      );
    }

    return dataVideo;
  }

  public async editing({idUser, idVideo}: DataQueryVideo, dto: UpdateVideoDto): Promise<Publication> {
    const dataVideo = await this.client.publication.update({
      where: {
        id: Number(idVideo),
        additional: {
          idUser: idUser
        }
      },
      data: {
        additional: {
          update: {
            ...dto,
            tags: dto.tags ? dto.tags.join(',') : undefined
          }
        }
      },
      include: {
        additional: true,
        comments: true,
        likes: true
      }
    });

    return dataVideo
  }

  public async delet({idUser, idVideo}: DataQueryVideo): Promise<Publication> {
    const dataVideo = await this.client.publication.delete({
      where: {
        id: Number(idVideo),
        additional: {
          idUser: idUser
        }
      },
      include: {
        additional: true,
        comments: true,
        likes: true
      }
    });

    return dataVideo
  }
}
