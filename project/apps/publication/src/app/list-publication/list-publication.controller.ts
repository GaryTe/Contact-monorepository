import { Controller, Get, Query, Param } from '@nestjs/common';

import {ListPublicationService} from './list-publication.service';
import {DetailInformationRdo} from './rdo/detail-information.rdo';
import {fillDTO} from '@project/helpers';
import {DataQueryList} from '@project/typs';

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

  @Get('/:idUser')
  public async list(@Param('idUser') idUser: string): Promise<DetailInformationRdo> {
    const dataPublicationsList = await this.listPublicationService.list(idUser);

    return fillDTO(DetailInformationRdo, dataPublicationsList)
  }
}
