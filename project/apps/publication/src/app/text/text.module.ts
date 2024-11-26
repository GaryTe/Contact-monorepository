import { Module } from '@nestjs/common';

import {TextController} from './text.controller';
import {TextService} from './text.service';
import {TextRepository} from './text.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration'

@Module({
  imports: [PrismaClientModule],
  controllers: [TextController],
  providers: [
    TextRepository,
    TextService
  ]
})
export class TextModule {}
