import { Injectable } from '@nestjs/common';

import {PrismaClientService} from '@project/prisma-publication.configuration';
import {BlogCommentEntity} from './blog-comment.entity';
import {DetailInformationComment, DataQueryComment} from '@project/typs';


@Injectable()
export class CommentRepository {
  constructor(
    protected readonly client: PrismaClientService,
  ) {}

  public async create(entity: BlogCommentEntity): Promise<DetailInformationComment> {
    const dataComment = entity.getDataComment;

    const record = await this.client.comment.create({
      data: {
        text: dataComment.text,
        idUser: dataComment.idUser,
        publicationId: dataComment.idPublication
        }
    });

    return record;
  }

  public async getAllComment({
    idPublication,
    limit,
    page
  }: {
    idPublication: number;
    limit: number;
    page: number;
  }): Promise<DetailInformationComment[] | []> {
    return await this.client.comment.findMany({
      where: {
        publicationId: idPublication
      },
      take: Number(limit),
      skip: Number(page) > 0 ? Number(page) : undefined
    });
  }

  public async delet({idUser, idComment}: DataQueryComment): Promise<DetailInformationComment> {
    const dataComment = await this.client.comment.delete({
      where: {
        id: Number(idComment),
        idUser: idUser
      }
    });

    return dataComment
  }
}
