import { Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import {Request} from 'express';

import {RepostService} from './repost.service';
import {DataQueryRepost} from './data-query-repost';
import {DetailInformationRdo} from './index';
import {fillDTO, getFullServerPath} from '@project/helpers';
import {AuthenticationGuard} from '@project/config-user';
import {GLOBAL_PEFIX} from '@project/consts';
import {Publication} from '@project/typs';

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
    const dataPublication = await this.repostService.create({...query, idUser: id}) as Publication;
    if(dataPublication.photo) {
    dataPublication.photo = `${getFullServerPath(process.env.HOST, process.env.PUBLICATION_PORT)}/${GLOBAL_PEFIX}${dataPublication.photo}`;
    }

    return fillDTO(DetailInformationRdo, dataPublication)
  }
}
