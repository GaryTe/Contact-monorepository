import { Controller, Post, Query, Get } from '@nestjs/common';

import {LikeService} from './like.service';
import {DataQueryLike} from '@project/typs';
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
    @Query() query: DataQueryLike
  ): Promise<LikeRdo> {
    return await this.likeService.getLike(query);
  }
}
