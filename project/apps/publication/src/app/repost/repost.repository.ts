import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {Publication, DataQueryRepost} from '@project/typs';
import {State} from '@project/enum';


@Injectable()
export class RepostRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async create({idUser, idPublication}: DataQueryRepost): Promise<Publication> {
    const dataRepost = await this.client.publication.findFirst({
      where: {
        additional: {
          idUser: idUser,
          originalIdPublication: idPublication
        }
      }
    });

    if(dataRepost) {
      throw new HttpException(
        `A publication with this id: ${idPublication} exists`,
        HttpStatus.OK
      );
    }


    const dataPublication = await this.client.publication.findFirst({
      where: {id: Number(idPublication)},
      include: {
        additional: true,
        comments: true,
        likes: true
      }
    });

    if(!dataPublication) {
      throw new HttpException(
        `A publication with this id: ${idPublication} not found`,
        HttpStatus.OK
      );
    }


    const record = await this.client.publication.create({
      data: {
        preview: dataPublication.preview,
        text: dataPublication.text,
        photo: dataPublication.photo,
        description: dataPublication.description,
          additional: {
            create: {
              idUser: idUser,
              name: dataPublication.additional.name,
              link: dataPublication.additional.link,
              tags: dataPublication.additional.tags,
              state: dataPublication.additional.state,
              repost: State.Repost,
              originalIdUser: dataPublication.additional.idUser,
              originalIdPublication: dataPublication.id.toString()
            }
          },
        comments: {
          create: [...dataPublication.comments]
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
}
