import { Controller, Post, Query, Get } from '@nestjs/common';

import {LikeService} from './like.service';
import {DataQueryLike} from './data-query-like';
import {DataQueryGetLike} from './data-query-get-like';
import {LikeRdo} from './rdo/like.rdo';

@Controller('/like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @Post('/')
  public async likeDislike(
    @Query() query: DataQueryLike
  ): Promise<LikeRdo> {
    return await this.likeService.likeDislike(query);
  }

  @Get('/')
  public async getLike(
    @Query() query: DataQueryGetLike
  ): Promise<LikeRdo> {
    return await this.likeService.getLike(query);
  }
}
