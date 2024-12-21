import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Query,
  Delete,
  ParseIntPipe,
  Req,
  UseGuards
} from '@nestjs/common';
import {Request} from 'express';

import {LinkService} from './link.service';
import { CreateLinkDto, UpdateLinkDto } from './index';
import { LinkRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryLink} from './data-query-link';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/link')
export class LinkController {
  constructor(
    private readonly linkService: LinkService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async create(
    @Req() req: Request,
    @Body() dto: CreateLinkDto,
    @Query('newsletter') newsletter: boolean
  ): Promise<LinkRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataLink = await this.linkService.create({...dto, idUser: id}, newsletter);
    return dataLink
  }

  @Get('/:idLink')
  public async show(@Param('idLink', ParseIntPipe) idLink: number): Promise<DetailInformationRdo> {
    const dataLink = await this.linkService.show(idLink);
    return fillDTO(DetailInformationRdo, dataLink)
  }

  @UseGuards(AuthenticationGuard)
  @Patch('/')
  public async editing(
    @Req() req: Request,
    @Body() dto: UpdateLinkDto,
    @Query() query: DataQueryLink): Promise<LinkRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataLink = await this.linkService.editing({...query, idUser: id}, dto);
    return fillDTO(LinkRdo, dataLink)
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/')
  public async delet(
    @Req() req: Request,
    @Query() query: DataQueryLink): Promise<LinkRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataLink = await this.linkService.delet({...query, idUser: id});
    return fillDTO(LinkRdo, dataLink)
  }
}
