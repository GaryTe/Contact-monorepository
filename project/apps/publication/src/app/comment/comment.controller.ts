import { Controller, Post, Body, Param, Get, Query, Delete } from '@nestjs/common';

import {CreateCommentDto} from './index';
import {CommentService} from './comment.service';
import {CommentRdo} from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryComment, DetailInformationComment} from '@project/typs';

@Controller('/comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreateCommentDto,
    @Param('idUser') idUser: string
  ): Promise<DetailInformationComment> {
    const dataComment = await this.commentService.create(dto, idUser);
    return fillDTO(CommentRdo, dataComment)
  }

  @Get('/:idPublication')
  public async getAllComment(@Param('idPublication') idPublication: string) {
    const dataCommentsList = await this.commentService.getAllComment(Number(idPublication));
    return fillDTO(CommentRdo, dataCommentsList)
  }

  @Delete('/')
  public async delet(@Query() query: DataQueryComment): Promise<DetailInformationComment> {
    const dataComment = await this.commentService.delet(query);
    return fillDTO(CommentRdo, dataComment)
  }
}
