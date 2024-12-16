import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards
} from '@nestjs/common';
import {Request} from 'express';

import {CreateCommentDto} from './index';
import {CommentService} from './comment.service';
import {CommentRdo} from './index';
import {fillDTO} from '@project/helpers';
import {DetailInformationComment} from '@project/typs';
import {DataQueryComment} from './data-query-comment';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async create(
    @Req() req: Request,
    @Body() dto: CreateCommentDto
  ): Promise<DetailInformationComment> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataComment = await this.commentService.create(dto, id);
    return fillDTO(CommentRdo, dataComment)
  }

  @Get('/:idPublication')
  public async getAllComment(@Param('idPublication', ParseIntPipe) idPublication: number) {
    const dataCommentsList = await this.commentService.getAllComment(idPublication);
    return fillDTO(CommentRdo, dataCommentsList)
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/')
  public async delet(
    @Req() req: Request,
    @Query() query: DataQueryComment): Promise<DetailInformationComment> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataComment = await this.commentService.delet({...query, idUser: id});
    return fillDTO(CommentRdo, dataComment)
  }
}
