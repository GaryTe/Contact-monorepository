import { Module } from '@nestjs/common';

import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ListPublicationController} from './list-publication.controller';
import {ListPublicationRepository} from './list-publication.repository';
import {ListPublicationService} from './list-publication.service';
import {ConfigUserModule} from '@project/config-user';

@Module({
  imports: [PrismaClientModule, ConfigUserModule],
  controllers: [ListPublicationController],
  providers: [
    ListPublicationRepository,
    ListPublicationService
  ]
})
export class ListPublicationModule {}
