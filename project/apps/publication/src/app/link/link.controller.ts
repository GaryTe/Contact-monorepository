import { Controller, Post, Body, Param, Get, Patch, Query, Delete } from '@nestjs/common';

import {LinkService} from './link.service';
import { CreateLinkDto, UpdateLinkDto } from './index';
import { LinkRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryLink} from '@project/typs';

@Controller('/link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreateLinkDto,
    @Param('idUser') idUser: string
  ): Promise<LinkRdo> {
    const dataLink = await this.linkService.create({...dto, idUser});
    return fillDTO(LinkRdo, dataLink)
  }

  @Get('/:idLink')
  public async show(@Param('idLink') idLink: string): Promise<DetailInformationRdo> {
    const dataLink = await this.linkService.show(Number(idLink));
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
