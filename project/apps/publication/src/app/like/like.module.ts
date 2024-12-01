import { Module } from '@nestjs/common';

import {LikeRepository} from './like.repository';
import {LikeService} from './like.service';
import {LikeController} from './like.controller';
import {PrismaClientModule} from '@project/prisma-publication.configuration'

@Module({
  imports: [PrismaClientModule],
  controllers: [LikeController],
  providers: [
    LikeRepository,
    LikeService
  ]
})
export class LikeModule {}
