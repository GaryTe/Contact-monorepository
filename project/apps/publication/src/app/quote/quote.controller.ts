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

import {QuoteService} from './quote.service';
import { CreateQuoteDto, UpdateQuoteDto } from './index';
import { QuoteRdo, DetailInformationRdo } from './index';
import {fillDTO} from '@project/helpers';
import {DataQueryQuote} from './data-query-quote';
import {AuthenticationGuard} from '@project/config-user';

@Controller('/quote')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('/')
  public async create(
    @Req() req: Request,
    @Body() dto: CreateQuoteDto,
    @Query('newsletter') newsletter: boolean
  ): Promise<QuoteRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataQuote = await this.quoteService.create({...dto, idUser: id}, newsletter);

    return dataQuote
  }

  @Get('/:idQuote')
  public async show(@Param('idQuote', ParseIntPipe) idQuote: number): Promise<DetailInformationRdo> {
    const dataQuote = await this.quoteService.show(idQuote);
    return fillDTO(DetailInformationRdo, dataQuote)
  }

  @UseGuards(AuthenticationGuard)
  @Patch('/')
  public async editing(
    @Req() req: Request,
    @Body() dto: UpdateQuoteDto,
    @Query() query: DataQueryQuote): Promise<QuoteRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataQuote = await this.quoteService.editing({...query, idUser: id}, dto);
    return fillDTO(QuoteRdo, dataQuote)
  }

  @UseGuards(AuthenticationGuard)
  @Delete('/')
  public async delet(
    @Req() req: Request,
    @Query() query: DataQueryQuote): Promise<QuoteRdo> {
    const [id] = req.headers?.tokenPayload as unknown as string
    const dataQuote = await this.quoteService.delet({...query, idUser: id});
    return fillDTO(QuoteRdo, dataQuote)
  }
}
