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
  UseGuards,
  Req
 } from '@nestjs/common';
 import {Request} from 'express';

import {TextService} from './text.service';
import { CreateTextDto, UpdateTextDto } from './index';
import { TextRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryText} from './data-query-text';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/text')
export class TextController {
  constructor(
    private readonly textService: TextService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async create(
    @Req() req: Request,
    @Body() dto: CreateTextDto
  ): Promise<TextRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataText = await this.textService.create({...dto, idUser: id});
    return fillDTO(TextRdo, dataText)
  }

  @Get('/:idText')
  public async show(@Param('idText', ParseIntPipe) idText: number): Promise<DetailInformationRdo> {
    const dataText = await this.textService.show(idText);
    return fillDTO(DetailInformationRdo, dataText)
  }

  @UseGuards(AuthenticationGuard)
  @Patch('/')
  public async editing(
    @Req() req: Request,
    @Body() dto: UpdateTextDto,
    @Query() query: DataQueryText): Promise<TextRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataText = await this.textService.editing({...query, idUser: id}, dto);
    return fillDTO(TextRdo, dataText)
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/')
  public async delet(
    @Req() req: Request,
    @Query() query: DataQueryText): Promise<TextRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataText = await this.textService.delet({...query, idUser: id});
    return fillDTO(TextRdo, dataText)
  }
}
