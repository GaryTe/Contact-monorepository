import { Controller, Post, Body, Param, Get, Patch, Query, Delete } from '@nestjs/common';

import {QuoteService} from './quote.service';
import { CreateQuoteDto, UpdateQuoteDto } from './index';
import { QuoteRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryQuote} from '@project/typs';

@Controller('/quote')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService
  ) {}

  @Post('/:idUser')
  public async create(
    @Body() dto: CreateQuoteDto,
    @Param('idUser') idUser: string
  ): Promise<QuoteRdo> {
    const dataQuote = await this.quoteService.create({...dto, idUser});
    return fillDTO(QuoteRdo, dataQuote)
  }

  @Get('/:idQuote')
  public async show(@Param('idQuote') idQuote: string): Promise<DetailInformationRdo> {
    const dataQuote = await this.quoteService.show(Number(idQuote));
    return fillDTO(DetailInformationRdo, dataQuote)
  }

  @Patch('/')
  public async editing(@Body() dto: UpdateQuoteDto, @Query() query: DataQueryQuote): Promise<QuoteRdo> {
    const dataQuote = await this.quoteService.editing(query, dto);
    return fillDTO(QuoteRdo, dataQuote)
  }

  @Delete('/')
  public async delet(@Query() query: DataQueryQuote): Promise<QuoteRdo> {
    const dataQuote = await this.quoteService.delet(query);
    return fillDTO(QuoteRdo, dataQuote)
  }
}
