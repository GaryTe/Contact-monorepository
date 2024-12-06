import { Controller, Get, Query, Param } from '@nestjs/common';

import {ListPublicationService} from './list-publication.service';
import {DetailInformationRdo} from './rdo/detail-information.rdo';
import {fillDTO} from '@project/helpers';
import {DataQueryList} from './data-query-list';
import {DataParamUser} from '../video/data-param-user';

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
  public async list(@Param() param: DataParamUser): Promise<DetailInformationRdo> {
    const dataPublicationsList = await this.listPublicationService.list(param.idUser);

    return fillDTO(DetailInformationRdo, dataPublicationsList)
  }
}
