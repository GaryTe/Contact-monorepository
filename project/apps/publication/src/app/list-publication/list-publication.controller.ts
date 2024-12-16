import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import {Request} from 'express';

import {ListPublicationService} from './list-publication.service';
import {DetailInformationRdo} from './rdo/detail-information.rdo';
import {fillDTO} from '@project/helpers';
import {DataQueryList} from './data-query-list';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/list')
export class ListPublicationController {
  constructor(
    private readonly listPublicationService: ListPublicationService
  ) {}

  @Get('/')
  public async index(@Query() query: DataQueryList): Promise<DetailInformationRdo> {
    const dataPublicationsList = await this.listPublicationService.index(query);

    return fillDTO(DetailInformationRdo, dataPublicationsList)
  }

  @UseGuards(AuthenticationGuard)
  @Get('/drafts')
  public async list(
    @Req() req: Request,
    ): Promise<DetailInformationRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataPublicationsList = await this.listPublicationService.list(id);

    return fillDTO(DetailInformationRdo, dataPublicationsList)
  }
}
