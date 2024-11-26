import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {BlogLinkEntity} from './blog-link.entity';
import {Publication, DataQueryLink} from '@project/typs';
import {UpdateLinkDto} from './index';

@Injectable()
export class LinkRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async create(entity: BlogLinkEntity): Promise<Publication> {
    const dataLink = entity.getDataLink;

    const record = await this.client.publication.create({
      data: {
        description: dataLink.description,
          additional: {
            create: {
              idUser: dataLink.idUser,
              link: dataLink.link,
              state: dataLink.state ? dataLink.state : undefined,
              tags: dataLink.tags ? dataLink.tags.join(',') : undefined
            }
          },
        comments: {
          connect: []
        }
      },
      include: {
        additional: true,
        comments: true
      }
    });

    return record;
  }

  public async show(idLink: number): Promise<Publication> {
    const dataLink = await this.client.publication.findFirst({
      where: {id: idLink},
      include: {
        additional: true,
        comments: true
      }
    });

    if(!dataLink) {
      throw new HttpException(
        `A link with this id: ${idLink} not found`,
        HttpStatus.OK
      );
    }

    return dataLink;
  }

  public async editing({idUser, idLink}: DataQueryLink, dto: UpdateLinkDto): Promise<Publication> {
    const dataLink = await this.client.publication.update({
      where: {
        id: Number(idLink),
        additional: {
          idUser: idUser
        }
      },
      data: {
        description: dto.description,
        additional: {
          update: {
            link: dto.link,
            state: dto.state,
            tags: dto.tags ? dto.tags.join(',') : undefined
          }
        }
      },
      include: {
        additional: true,
        comments: true
      }
    });

    return dataLink
  }

  public async delet({idUser, idLink}: DataQueryLink): Promise<Publication> {
    const dataLink = await this.client.publication.delete({
      where: {
        id: Number(idLink),
        additional: {
          idUser: idUser
        }
      },
      include: {
        additional: true,
        comments: true
      }
    });

    return dataLink
  }
}
