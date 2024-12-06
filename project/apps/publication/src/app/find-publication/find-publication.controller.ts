import { Controller, Get, Param } from '@nestjs/common';

import {FindPublicationService} from './find-publication.service';
import {DetailInformationRdo} from './rdo/detail-information.rdo';
import {fillDTO} from '@project/helpers';
import {DataParamPublication} from './data-param-publication';

@Controller('/find')
export class FindPublicationController {
  constructor(
    private readonly findPublicationService: FindPublicationService
  ) {}

  @Get('/:word')
  public async likeDislike(@Param() param: DataParamPublication): Promise<DetailInformationRdo> {
    const dataPublication = await this.findPublicationService.findPublication(param.word);

    return fillDTO(DetailInformationRdo, dataPublication)
  }
}
