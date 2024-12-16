import { Module } from '@nestjs/common';

import {RepostController} from './repost.controller';
import {RepostService} from './repost.service';
import {RepostRepository} from './repost.repository';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';

@Module({
  imports: [PrismaClientModule, ConfigUserModule],
  controllers: [RepostController],
  providers: [
    RepostRepository,
    RepostService
  ]
})
export class RepostModule {}
