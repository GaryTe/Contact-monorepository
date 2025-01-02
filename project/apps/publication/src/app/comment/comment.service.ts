import { Injectable } from '@nestjs/common';
import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';

import {CommentRepository} from './comment.repository';
import {DataQueryComment, DetailInformationComment} from '@project/typs';
import {BlogCommentEntity} from './blog-comment.entity';
import {CreateCommentDto} from './index';
import {Counter, RabbitRouting} from '@project/enum';
import {UserConfig} from '@project/config-user';
import {AuthorComment, NotifyConfig} from '@project/config-notify';

@Injectable()
export class CommentService {
  private limit;
  private page;
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly amqpConnection: AmqpConnection,
    private readonly config: NotifyConfig,
    private readonly userConfig: UserConfig
  ) {
    this.limit = Counter.Fifty;
    this.page = Counter.Zero;
  }

  public async create(dto: CreateCommentDto, idUser: string): Promise<DetailInformationComment> {
    const dataComment = new BlogCommentEntity({...dto, idUser});
    const _dataComment = await this.commentRepository.create(dataComment);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [_dataComment.idUser]
    })

    const comment = await new AuthorComment(
      this.userConfig
    ).execute(
      _dataComment,
      dataAuthor
    )

    if(Array.isArray(comment)) {
      throw new Error('const comment is not an object, at (project/apps/publication/src/app/comment/comment.service.ts: 49)')
    }

    return comment
  }

  public async getAllComment(idPublication: number): Promise<DetailInformationComment[] | []> {
    const dataAuthorList = []
    const dataCommentsList = await this.commentRepository.getAllComment({
      idPublication,
      limit: this.limit,
      page: this.page
    });

    if(!dataCommentsList.length) {
      this.limit = Counter.Fifty;
      this.page = Counter.Zero;
    }else{
      this.limit += Counter.Fifty;
      this.page += Counter.Fifty;
    }

    dataCommentsList.forEach((index: DetailInformationComment) => {
      dataAuthorList.push(index.idUser)
    })

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: dataAuthorList
    })

    const comment = await new AuthorComment(
      this.userConfig
    ).execute(
      dataCommentsList,
      dataAuthor
    )

    if(!Array.isArray(comment)) {
      throw new Error('const comment is not an array, at (project/apps/publication/src/app/comment/comment.service.ts: 94)')
    }

    return comment
  }

  public async delet(query: DataQueryComment): Promise<DetailInformationComment> {
    const dataComment = await this.commentRepository.delet(query);

    const dataAuthor = await this.amqpConnection.request<{
      id: string,
      name: string,
      email: string,
      avatar: string
    }[] | null>({
      exchange: this.config.get('EXCHANG_PUBLICATION'),
      routingKey: RabbitRouting.AddUser,
      payload: [dataComment.idUser]
    })

    const comment = await new AuthorComment(
      this.userConfig
    ).execute(
      dataComment,
      dataAuthor
    )

    if(Array.isArray(comment)) {
      throw new Error('const comment is not an object, at (project/apps/publication/src/app/comment/comment.service.ts: 122)')
    }

    return comment
  }
}
