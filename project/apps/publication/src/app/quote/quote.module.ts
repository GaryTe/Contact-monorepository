import { Module } from '@nestjs/common';

import {QuoteController} from './quote.controller';
import {QuoteService} from './quote.service';
import {QuoteRepository} from './quote.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration'

@Module({
  imports: [PrismaClientModule],
  controllers: [QuoteController],
  providers: [
    QuoteRepository,
    QuoteService
  ]
})
export class QuoteModule {}