import { Module } from '@nestjs/common';

import {RepostController} from './repost.controller';
import {RepostService} from './repost.service';
import {RepostRepository} from './repost.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration'

@Module({
  imports: [PrismaClientModule],
  controllers: [RepostController],
  providers: [
    RepostRepository,
    RepostService
  ]
})
export class RepostModule {}
