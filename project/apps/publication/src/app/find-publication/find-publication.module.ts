import { Module } from '@nestjs/common';

import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {FindPublicationRepository} from './find-publication.repository';
import {FindPublicationService} from './find-publication.service';
import {FindPublicationController} from './find-publication.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [FindPublicationController],
  providers: [
    FindPublicationRepository,
    FindPublicationService
  ]
})
export class FindPublicationModule {}
