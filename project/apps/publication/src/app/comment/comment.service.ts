import { Injectable } from '@nestjs/common';

import {CommentRepository} from './comment.repository';
import {DataQueryComment, DetailInformationComment} from '@project/typs';
import {BlogCommentEntity} from './blog-comment.entity';
import {CreateCommentDto} from './index';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  public async create(dto: CreateCommentDto, idUser: string): Promise<DetailInformationComment> {
    const dataComment = new BlogCommentEntity({...dto, idUser});

    return await this.commentRepository.create(dataComment);
  }

  public async getAllComment(idPublication: number): Promise<DetailInformationComment[]> {
    return await this.commentRepository.getAllComment(idPublication);
  }

  public async delet(query: DataQueryComment): Promise<DetailInformationComment> {
    return await this.commentRepository.delet(query);
  }
}
