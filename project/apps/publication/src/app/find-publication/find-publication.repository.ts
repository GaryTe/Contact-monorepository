import { Injectable } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {Counter} from '@project/enum';
import {Publication} from '@project/typs';


@Injectable()
export class FindPublicationRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async findPublication(word: string): Promise<Publication[] | []> {

    return await this.client.publication.findMany({
      where: {
        additional: {
          name: {
            search: word
          }
        }
      },
      include: {
        additional: true,
        comments: true,
        likes: true
      },
      take: Counter.Twenty
    })
  }
}
