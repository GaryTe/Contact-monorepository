import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {BlogPhotoEntity} from './blog-photo.entity';
import {Publication, DataQueryPhoto} from '@project/typs';
import {UpdatePhotoDto} from './index';
import {TypePublication} from '@project/enum';

@Injectable()
export class PhotoRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async create(entity: BlogPhotoEntity): Promise<Publication> {
    const dataPhoto = entity.getDataPhoto;

    const record = await this.client.publication.create({
      data: {
        photo: dataPhoto.photo,
          additional: {
            create: {
              idUser: dataPhoto.idUser,
              state: dataPhoto.state ? dataPhoto.state : undefined,
              type: TypePublication.Photo,
              tags: dataPhoto.tags ? dataPhoto.tags.join(',') : undefined
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

  public async show(idPhoto: number): Promise<Publication> {
    const dataPhoto = await this.client.publication.findFirst({
      where: {id: idPhoto},
      include: {
        additional: true,
        comments: true,
        likes: true
      }
    });

    if(!dataPhoto) {
      throw new HttpException(
        `A photo with this id: ${idPhoto} not found`,
        HttpStatus.OK
      );
    }

    return dataPhoto;
  }

  public async editing({idUser, idPhoto}: DataQueryPhoto, dto: UpdatePhotoDto): Promise<Publication> {
    const dataPhoto = await this.client.publication.update({
      where: {
        id: Number(idPhoto),
        additional: {
          idUser: idUser
        }
      },
      data: {
        photo: dto.photo,
        additional: {
          update: {
            state: dto.state,
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

    return dataPhoto
  }

  public async delet({idUser, idPhoto}: DataQueryPhoto): Promise<Publication> {
    const dataPhoto = await this.client.publication.delete({
      where: {
        id: Number(idPhoto),
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

    return dataPhoto
  }
}
