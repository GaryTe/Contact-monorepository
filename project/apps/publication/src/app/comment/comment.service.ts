import { Injectable } from '@nestjs/common';

import {CommentRepository} from './comment.repository';
import {DataQueryComment, DetailInformationComment} from '@project/typs';
import {BlogCommentEntity} from './blog-comment.entity';
import {CreateCommentDto} from './index';
import {Counter} from '@project/enum';

@Injectable()
export class CommentService {
  private limit;
  private page;
  constructor(
    private readonly commentRepository: CommentRepository
  ) {
    this.limit = Counter.Fifty;
    this.page = Counter.Zero;
  }

  public async create(dto: CreateCommentDto, idUser: string): Promise<DetailInformationComment> {
    const dataComment = new BlogCommentEntity({...dto, idUser});

    return await this.commentRepository.create(dataComment);
  }

  public async getAllComment(idPublication: number): Promise<DetailInformationComment[] | []> {
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

    return dataCommentsList
  }

  public async delet(query: DataQueryComment): Promise<DetailInformationComment> {
    return await this.commentRepository.delet(query);
  }
}
