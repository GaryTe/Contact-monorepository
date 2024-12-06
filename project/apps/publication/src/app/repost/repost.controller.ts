import { Controller, Post, Query } from '@nestjs/common';

import {RepostService} from './repost.service';
import {DataQueryRepost} from './data-query-repost';
import {DetailInformationRdo} from './index';
import {fillDTO} from '@project/helpers'

@Controller('/repost')
export class RepostController {
  constructor(
    private readonly repostService: RepostService
  ) {}

  @Post('/')
  public async create(
    @Query() query: DataQueryRepost
  ): Promise<DetailInformationRdo> {
    const dataPublication = await this.repostService.create(query);
    return fillDTO(DetailInformationRdo, dataPublication)
  }
}
