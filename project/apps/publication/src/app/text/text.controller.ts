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

import {TextService} from './text.service';
import { CreateTextDto, UpdateTextDto } from './index';
import { TextRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryText} from './data-query-text';
import {DataParamUser} from '../video/data-param-user';

@Controller('/text')
export class TextController {
  constructor(
    private readonly textService: TextService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreateTextDto,
    @Param() param: DataParamUser
  ): Promise<TextRdo> {
    const dataText = await this.textService.create({...dto, idUser: param.idUser});
    return fillDTO(TextRdo, dataText)
  }

  @Get('/:idText')
  public async show(@Param('idText', ParseIntPipe) idText: number): Promise<DetailInformationRdo> {
    const dataText = await this.textService.show(idText);
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
