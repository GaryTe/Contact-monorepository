import { Injectable } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {DataQueryList, Publication} from '@project/typs';
import {State, Sort} from '@project/enum';
import {SORT} from '@project/consts';


@Injectable()
export class ListPublicationRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async index({
    idUser,
    sort,
    type,
    tag,
    limit,
    page
  }: DataQueryList & {
    limit: number;
    page: number;
  }): Promise<Publication[] | []> {

    return await this.client.publication.findMany({
      where: {
        additional: {
          idUser: idUser,
          state: State.Published,
          type: type,
          tags: {
            contains: tag
          }
        }
      },
      orderBy: [
        {additional: {
          dataPublication: !sort ? SORT : undefined
        }},
        {likes: sort === Sort.Like ? {_count: SORT} : undefined},
        {comments: sort === Sort.Comment ? {_count: SORT} : undefined}
      ],
      include: {
        additional: true,
        comments: true,
        likes: true
      },
      take: limit,
      skip: page > 0 ? page : undefined
    })
  }

  public async list({
    idUser,
    limit,
    page
  }: {
    idUser: string;
    limit: number;
    page: number;
  }): Promise<Publication[] | []> {

    return await this.client.publication.findMany({
      where: {
        additional: {
          idUser: idUser,
          state: State.Draft,
        }
      },
      include: {
        additional: true,
        comments: true,
        likes: true
      },
      take: Number(limit),
      skip: Number(page) > 0 ? Number(page) : undefined
    })
  }

  public async publicationList({
    idUser
  }: {
    idUser: string;
  }): Promise<Publication[] | []> {

    return await this.client.publication.findMany({
      where: {
        additional: {
          idUser: idUser,
          state: State.Published,
        }
      },
      include: {
        additional: true,
        comments: true,
        likes: true
      }
    })
  }
}
