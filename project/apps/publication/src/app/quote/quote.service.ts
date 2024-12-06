import { Injectable } from '@nestjs/common';

import {QuoteRepository} from './quote.repository';
import {DataQuote, Publication , DataQueryQuote} from '@project/typs';
import {BlogQuoteEntity} from './blog-quote.entity';
import {UpdateQuoteDto} from './index';
import {filterTags} from '@project/helpers';

@Injectable()
export class QuoteService {
  constructor(
    private readonly quoteRepository: QuoteRepository
  ) {}

  public async create(dto: DataQuote): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    const dataQuote = new BlogQuoteEntity({
      ...dto,
      tags: tagsList
    });

    return await this.quoteRepository.create(dataQuote);
  }

  public async show(idQuote: number): Promise<Publication> {
    return await this.quoteRepository.show(idQuote);
  }

  public async editing(query: DataQueryQuote, dto: UpdateQuoteDto): Promise<Publication> {
    const tagsList = filterTags(dto.tags);
    return await this.quoteRepository.editing(
      query,
      {...dto, tags: tagsList}
    );
  }

  public async delet(query: DataQueryQuote): Promise<Publication> {
    return await this.quoteRepository.delet(query);
  }
}
