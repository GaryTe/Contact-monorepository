import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {BlogTextEntity} from './blog-text.entity';
import {Publication, DataQueryText} from '@project/typs';
import {UpdateTextDto} from './index';

@Injectable()
export class TextRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async create(entity: BlogTextEntity): Promise<Publication> {
    const dataText = entity.getDataText;

    const record = await this.client.publication.create({
      data: {
        preview: dataText.preview,
        text: dataText.text,
          additional: {
            create: {
              idUser: dataText.idUser,
              name: dataText.name,
              state: dataText.state ? dataText.state : undefined,
              tags: dataText.tags ? dataText.tags.join(',') : undefined
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

  public async show(idText: number): Promise<Publication> {
    const dataText = await this.client.publication.findFirst({
      where: {id: idText},
      include: {
        additional: true,
        comments: true
      }
    });

    if(!dataText) {
      throw new HttpException(
        `A text with this id: ${idText} not found`,
        HttpStatus.OK
      );
    }

    return dataText;
  }

  public async editing({idUser, idText}: DataQueryText, dto: UpdateTextDto): Promise<Publication> {
    const dataText = await this.client.publication.update({
      where: {
        id: Number(idText),
        additional: {
          idUser: idUser
        }
      },
      data: {
        preview: dto.preview,
        text: dto.text,
        additional: {
          update: {
            name: dto.name,
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

    return dataText
  }

  public async delet({idUser, idText}: DataQueryText): Promise<Publication> {
    const dataText = await this.client.publication.delete({
      where: {
        id: Number(idText),
        additional: {
          idUser: idUser
        }
      },
      include: {
        additional: true,
        comments: true
      }
    });

    return dataText
  }
}
