import { Controller, Post, Query, Get, Req, UseGuards } from '@nestjs/common';
import {Request} from 'express';

import {LikeService} from './like.service';
import {DataQueryLike} from './data-query-like';
import {DataQueryGetLike} from './data-query-get-like';
import {LikeRdo} from './rdo/like.rdo';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async likeDislike(
    @Req() req: Request,
    @Query() query: DataQueryLike
  ): Promise<LikeRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    return await this.likeService.likeDislike({...query, idUser: id});
  }

  @Get('/')
  public async getLike(
    @Query() query: DataQueryGetLike
  ): Promise<LikeRdo> {
    return await this.likeService.getLike(query);
  }
}
