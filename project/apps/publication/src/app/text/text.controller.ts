import { Controller, Post, Body, Param, Get, Patch, Query, Delete } from '@nestjs/common';

import {TextService} from './text.service';
import { CreateTextDto, UpdateTextDto } from './index';
import { TextRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryText} from '@project/typs';

@Controller('/text')
export class TextController {
  constructor(
    private readonly textService: TextService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreateTextDto,
    @Param('idUser') idUser: string
  ): Promise<TextRdo> {
    const dataText = await this.textService.create({...dto, idUser});
    return fillDTO(TextRdo, dataText)
  }

  @Get('/:idText')
  public async show(@Param('idText') idText: string): Promise<DetailInformationRdo> {
    const dataText = await this.textService.show(Number(idText));
    return fillDTO(DetailInformationRdo, dataText)
  }

  @Patch('/')
  public async editing(@Body() dto: UpdateTextDto, @Query() query: DataQueryText): Promise<TextRdo> {
    const dataText = await this.textService.editing(query, dto);
    return fillDTO(TextRdo, dataText)
  }

  @Delete('/')
  public async delet(@Query() query: DataQueryText): Promise<TextRdo> {
    const dataText = await this.textService.delet(query);
    return fillDTO(TextRdo, dataText)
  }
}
