import { Module } from '@nestjs/common';

import {LikeRepository} from './like.repository';
import {LikeService} from './like.service';
import {LikeController} from './like.controller';
import {PrismaClientModule} from '@project/prisma-publication.configuration';
import {ConfigUserModule} from '@project/config-user';

@Module({
  imports: [PrismaClientModule, ConfigUserModule],
  controllers: [LikeController],
  providers: [
    LikeRepository,
    LikeService
  ]
})
export class LikeModule {}
