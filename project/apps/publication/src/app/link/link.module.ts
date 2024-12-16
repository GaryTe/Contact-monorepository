import { Module } from '@nestjs/common';

import {LinkController} from './link.controller';
import {LinkService} from './link.service';
import {LinkRepository} from './link.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';

@Module({
  imports: [PrismaClientModule, ConfigUserModule],
  controllers: [LinkController],
  providers: [
    LinkRepository,
    LinkService
  ]
})
export class LinkModule {}
