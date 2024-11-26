import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {BlogQuoteEntity} from './blog-quote.entity';
import {Publication, DataQueryQuote} from '@project/typs';
import {UpdateQuoteDto} from './index';

@Injectable()
export class QuoteRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async create(entity: BlogQuoteEntity): Promise<Publication> {
    const dataQuote = entity.getDataQuote;

    const record = await this.client.publication.create({
      data: {
        text: dataQuote.text,
          additional: {
            create: {
              idUser: dataQuote.idUser,
              name: dataQuote.name,
              state: dataQuote.state ? dataQuote.state : undefined,
              tags: dataQuote.tags ? dataQuote.tags.join(',') : undefined
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

  public async show(idQuote: number): Promise<Publication> {
    const dataQuote = await this.client.publication.findFirst({
      where: {id: idQuote},
      include: {
        additional: true,
        comments: true
      }
    });

    if(!dataQuote) {
      throw new HttpException(
        `A quote with this id: ${idQuote} not found`,
        HttpStatus.OK
      );
    }

    return dataQuote;
  }

  public async editing({idUser, idQuote}: DataQueryQuote, dto: UpdateQuoteDto): Promise<Publication> {
    const dataQuote = await this.client.publication.update({
      where: {
        id: Number(idQuote),
        additional: {
          idUser: idUser
        }
      },
      data: {
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

    return dataQuote
  }

  public async delet({idUser, idQuote}: DataQueryQuote): Promise<Publication> {
    const dataQuote = await this.client.publication.delete({
      where: {
        id: Number(idQuote),
        additional: {
          idUser: idUser
        }
      },
      include: {
        additional: true,
        comments: true
      }
    });

    return dataQuote
  }
}
