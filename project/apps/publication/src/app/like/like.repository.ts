import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {State} from '@project/enum';
import {DataQueryLike} from '@project/typs';
import {LikeRdo} from './rdo/like.rdo';


@Injectable()
export class LikeRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async likeDislike({idLike, idUser, idPublication}: DataQueryLike): Promise<LikeRdo> {

    const dataPublication = await this.client.publication.findFirst({
      where: {
        id: Number(idPublication),
        additional: {
          state: State.Published
        }
      }
    })

    if(!dataPublication) {
      throw new HttpException(
        'You can leave a like for the publication that is in the published state',
        HttpStatus.BAD_REQUEST
      );
    }

    const dataLike = await this.client.like.upsert({
      where: {
        id: Number(idLike)
      },
      create: {
        idUser: idUser,
        like: true,
        publicationId: Number(idPublication)
      },
      update: {
        like: false
      }
    });

    if(!dataLike.like) {
      await this.client.like.delete({
        where: {
          id: Number(idLike),
          publicationId: Number(idPublication)
        }
      })
    }

    return dataLike
  }

  public async getLike({idUser, idPublication}: DataQueryLike): Promise<LikeRdo> {
    return await this.client.like.findFirst({
      where: {
        idUser: idUser,
        publicationId: Number(idPublication)
      }
    });
  }
}
