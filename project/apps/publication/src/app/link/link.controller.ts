import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Query,
  Delete,
  ParseIntPipe
} from '@nestjs/common';

import {LinkService} from './link.service';
import { CreateLinkDto, UpdateLinkDto } from './index';
import { LinkRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryLink} from './data-query-link';
import {DataParamUser} from '../video/data-param-user';

@Controller('/link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreateLinkDto,
    @Param() param: DataParamUser
  ): Promise<LinkRdo> {
    const dataLink = await this.linkService.create({...dto, idUser: param.idUser});
    return fillDTO(LinkRdo, dataLink)
  }

  @Get('/:idLink')
  public async show(@Param('idLink', ParseIntPipe) idLink: number): Promise<DetailInformationRdo> {
    const dataLink = await this.linkService.show(idLink);
    return fillDTO(DetailInformationRdo, dataLink)
  }

  @Patch('/')
  public async editing(@Body() dto: UpdateLinkDto, @Query() query: DataQueryLink): Promise<LinkRdo> {
    const dataLink = await this.linkService.editing(query, dto);
    return fillDTO(LinkRdo, dataLink)
  }

  @Delete('/')
  public async delet(@Query() query: DataQueryLink): Promise<LinkRdo> {
    const dataLink = await this.linkService.delet(query);
    return fillDTO(LinkRdo, dataLink)
  }
}
