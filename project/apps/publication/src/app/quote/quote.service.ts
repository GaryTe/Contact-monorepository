import { Injectable } from '@nestjs/common';

import {QuoteRepository} from './quote.repository';
import {DataQuote, Publication , DataQueryQuote} from '@project/typs';
import {BlogQuoteEntity} from './blog-quote.entity';
import {UpdateQuoteDto} from './index';

@Injectable()
export class QuoteService {
  constructor(
    private readonly quoteRepository: QuoteRepository
  ) {}

  public async create(dto: DataQuote): Promise<Publication> {
    const dataQuote = new BlogQuoteEntity(dto);

    return await this.quoteRepository.create(dataQuote);
  }

  public async show(idQuote: number): Promise<Publication> {
    return await this.quoteRepository.show(idQuote);
  }

  public async editing(query: DataQueryQuote, dto: UpdateQuoteDto): Promise<Publication> {
    return await this.quoteRepository.editing(query, dto);
  }

  public async delet(query: DataQueryQuote): Promise<Publication> {
    return await this.quoteRepository.delet(query);
  }
}
