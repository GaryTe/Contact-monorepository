import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Delete,
  ParseIntPipe
} from '@nestjs/common';

import {CreateCommentDto} from './index';
import {CommentService} from './comment.service';
import {CommentRdo} from './index';
import {fillDTO} from '@project/helpers';
import {DetailInformationComment} from '@project/typs';
import {DataQueryComment} from './data-query-comment';
import {DataParamUser} from '../video/data-param-user';

@Controller('/comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreateCommentDto,
    @Param() param: DataParamUser
  ): Promise<DetailInformationComment> {
    const dataComment = await this.commentService.create(dto, param.idUser);
    return fillDTO(CommentRdo, dataComment)
  }

  @Get('/:idPublication')
  public async getAllComment(@Param('idPublication', ParseIntPipe) idPublication: number) {
    const dataCommentsList = await this.commentService.getAllComment(idPublication);
    return fillDTO(CommentRdo, dataCommentsList)
  }

  @Delete('/')
  public async delet(@Query() query: DataQueryComment): Promise<DetailInformationComment> {
    const dataComment = await this.commentService.delet(query);
    return fillDTO(CommentRdo, dataComment)
  }
}
