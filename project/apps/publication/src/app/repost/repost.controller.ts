import { Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import {Request} from 'express';

import {RepostService} from './repost.service';
import {DataQueryRepost} from './data-query-repost';
import {DetailInformationRdo} from './index';
import {fillDTO} from '@project/helpers';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/repost')
export class RepostController {
  constructor(
    private readonly repostService: RepostService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async create(
    @Req() req: Request,
    @Query() query: DataQueryRepost
  ): Promise<DetailInformationRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataPublication = await this.repostService.create({...query, idUser: id});
    return fillDTO(DetailInformationRdo, dataPublication)
  }
}
