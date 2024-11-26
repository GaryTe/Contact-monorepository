import { Module } from '@nestjs/common';

import {LinkController} from './link.controller';
import {LinkService} from './link.service';
import {LinkRepository} from './link.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration'

@Module({
  imports: [PrismaClientModule],
  controllers: [LinkController],
  providers: [
    LinkRepository,
    LinkService
  ]
})
export class LinkModule {}
