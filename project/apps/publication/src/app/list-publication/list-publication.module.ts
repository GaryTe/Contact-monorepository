import { Module } from '@nestjs/common';

import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ListPublicationController} from './list-publication.controller';
import {ListPublicationRepository} from './list-publication.repository';
import {ListPublicationService} from './list-publication.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [ListPublicationController],
  providers: [
    ListPublicationRepository,
    ListPublicationService
  ]
})
export class ListPublicationModule {}
